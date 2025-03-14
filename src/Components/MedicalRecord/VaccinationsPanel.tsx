import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Vaccination } from './types';
import { 
  getVaccinations, 
  addVaccination, 
  updateVaccination, 
  deleteVaccination 
} from '../../services/medicalRecordService';

interface VaccinationsPanelProps {
  petId: string | null;
}

export const VaccinationsPanel: React.FC<VaccinationsPanelProps> = ({ petId }) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [vaccineName, setVaccineName] = useState('');
  const [vaccinationDate, setVaccinationDate] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingVaccination, setEditingVaccination] = useState<Vaccination | null>(null);
  
  // Counter to force refresh
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Fetch vaccinations from backend
  const fetchVaccinations = async () => {
    if (!petId) {
      setIsLoading(false);
      setVaccinations([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await getVaccinations(petId);
            if (!response || !Array.isArray(response)) {
        setVaccinations([]);
        return;
      }
      
      const transformedVaccinations = response.map(item => ({
        id: item.id?.toString() || String(Math.random()),
        name: item.vaccineName || '',
        date: item.vaccinationDate || '',
        veterinarian: item.veterinarian || ''
      }));
      
      setVaccinations(transformedVaccinations);
    } catch (err) {
      console.error('Error fetching vaccinations:', err);
      setError('Failed to load vaccinations.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccinations();
  }, [petId, refreshCounter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petId) {
      setError('Pet ID is missing');
      return;
    }
    
    if (!vaccineName || !vaccinationDate || !veterinarian) {
      setError('All fields are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const vaccinationData = {
        vaccineName,
        vaccinationDate,
        veterinarian
      };
      
      if (editingVaccination) {
        await updateVaccination(petId, editingVaccination.id, vaccinationData);
      } else {
        await addVaccination(petId, vaccinationData);
      }
      
    
      setVaccineName('');
      setVaccinationDate('');
      setVeterinarian('');
      setShowModal(false);
      setEditingVaccination(null);
      
      setRefreshCounter(prev => prev + 1);
    } catch (err) {
      console.error('Error saving vaccination:', err);
      setError('Failed to save vaccination.');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleEdit = (vaccination: Vaccination) => {
    setEditingVaccination(vaccination);
    setVaccineName(vaccination.name);
    setVaccinationDate(vaccination.date);
    setVeterinarian(vaccination.veterinarian);
    setShowModal(true);
  };

  
  const handleDelete = async (vaccinationId: string) => {
    if (!petId) {
      setError('Pet ID is missing');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this vaccination record?')) {
      return;
    }
    
    try {
      await deleteVaccination(petId, vaccinationId);
      setRefreshCounter(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting vaccination:', err);
      setError('Failed to delete vaccination.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Vaccination Records</h2>
        <button
          onClick={() => {
            setEditingVaccination(null);
            setVaccineName('');
            setVaccinationDate('');
            setVeterinarian('');
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Aşı Ekle
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading vaccinations...</p>
        </div>
      ) : vaccinations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No vaccination records found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vaccine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Veterinarian
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vaccinations.map((vaccination) => (
                <tr key={vaccination.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vaccination.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {vaccination.date ? format(new Date(vaccination.date), 'MMM d, yyyy') : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{vaccination.veterinarian}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(vaccination)}
                      className="text-orange-600 hover:text-orange-900 mr-4"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(vaccination.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingVaccination ? 'Edit Vaccination' : 'Add Vaccination'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccineName">
                  Vaccine Name
                </label>
                <input
                  id="vaccineName"
                  type="text"
                  value={vaccineName}
                  onChange={(e) => setVaccineName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter vaccine name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vaccinationDate">
                  Vaccination Date
                </label>
                <input
                  id="vaccinationDate"
                  type="date"
                  value={vaccinationDate}
                  onChange={(e) => setVaccinationDate(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="veterinarian">
                  Veterinarian
                </label>
                <input
                  id="veterinarian"
                  type="text"
                  value={veterinarian}
                  onChange={(e) => setVeterinarian(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter veterinarian name"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  İptal Et
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {isSubmitting ? 'Saving...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};