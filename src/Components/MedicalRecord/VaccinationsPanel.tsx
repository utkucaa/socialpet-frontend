import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Vaccination } from './types';
import { getVaccinations, addVaccination } from '../../services/medicalRecordService';

interface VaccinationsPanelProps {
  medicalRecordId: string | null;
}

export const VaccinationsPanel: React.FC<VaccinationsPanelProps> = ({ medicalRecordId }) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [vaccineName, setVaccineName] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchVaccinations = async () => {
      if (!medicalRecordId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getVaccinations(medicalRecordId);
        
        // Transform API data to match our component's Vaccination type
        const transformedVaccinations: Vaccination[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.vaccineName,
          date: item.vaccinationDate,
          veterinarian: item.veterinarian
        }));
        
        setVaccinations(transformedVaccinations);
      } catch (err) {
        console.error('Error fetching vaccinations:', err);
        setError('Failed to load vaccinations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVaccinations();
  }, [medicalRecordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicalRecordId) {
      // This should not happen as the parent component ensures medicalRecordId is available
      console.error('Attempted to add vaccination without a medical record ID');
      setError('System error: Unable to add vaccination. Please try again later.');
      return;
    }
    
    if (!vaccineName || !vaccinationDate || !veterinarian) {
      setError('All fields are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newVaccination = await addVaccination(medicalRecordId, {
        vaccineName,
        vaccinationDate,
        veterinarian
      });
      
      // Transform the API response to match our component's Vaccination type
      const transformedVaccination: Vaccination = {
        id: newVaccination.id.toString(),
        name: newVaccination.vaccineName,
        date: newVaccination.vaccinationDate,
        veterinarian: newVaccination.veterinarian
      };
      
      setVaccinations([...vaccinations, transformedVaccination]);
      
      // Reset form
      setVaccineName('');
      setVaccinationDate('');
      setVeterinarian('');
      setShowModal(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error adding vaccination:', err);
      setError('Failed to add vaccination. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Vaccination Records</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!medicalRecordId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vaccination
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading vaccinations...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : vaccinations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No vaccinations recorded yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {vaccinations.map((vaccination) => (
            <div
              key={vaccination.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">{vaccination.name}</h3>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Date: {format(new Date(vaccination.date), 'MMM dd, yyyy')}</p>
                <p>Veterinarian: {vaccination.veterinarian}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Vaccination</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vaccine Name</label>
                <input
                  type="text"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={vaccinationDate}
                  onChange={(e) => setVaccinationDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Veterinarian</label>
                <input
                  type="text"
                  value={veterinarian}
                  onChange={(e) => setVeterinarian(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError(null); // Clear any errors when closing
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};