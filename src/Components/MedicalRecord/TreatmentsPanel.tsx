// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Treatment } from './types';
import { getTreatments, addTreatment } from '../../services/medicalRecordService';

interface TreatmentsPanelProps {
  medicalRecordId: string | null;
}

export const TreatmentsPanel: React.FC<TreatmentsPanelProps> = ({ medicalRecordId }) => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [treatmentName, setTreatmentName] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTreatments = async () => {
      if (!medicalRecordId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getTreatments(medicalRecordId);
        
        // Transform API data to match our component's Treatment type
        const transformedTreatments: Treatment[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.treatmentName,
          date: item.treatmentDate,
          veterinarian: item.veterinarian,
          notes: item.notes || ''
        }));
        
        setTreatments(transformedTreatments);
      } catch (err) {
        console.error('Error fetching treatments:', err);
        setError('Failed to load treatments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTreatments();
  }, [medicalRecordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicalRecordId) {
      // This should not happen as the parent component ensures medicalRecordId is available
      console.error('Attempted to add treatment without a medical record ID');
      setError('System error: Unable to add treatment. Please try again later.');
      return;
    }
    
    if (!treatmentName || !treatmentDate || !veterinarian) {
      setError('Treatment name, date, and veterinarian are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newTreatment = await addTreatment(medicalRecordId, {
        treatmentName,
        treatmentDate,
        veterinarian,
        notes
      });
      
      // Transform the API response to match our component's Treatment type
      const transformedTreatment: Treatment = {
        id: newTreatment.id.toString(),
        name: newTreatment.treatmentName,
        date: newTreatment.treatmentDate,
        veterinarian: newTreatment.veterinarian,
        notes: newTreatment.notes || ''
      };
      
      setTreatments([...treatments, transformedTreatment]);
      
      // Reset form
      setTreatmentName('');
      setTreatmentDate('');
      setVeterinarian('');
      setNotes('');
      setShowModal(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error adding treatment:', err);
      setError('Failed to add treatment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Treatment Records</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!medicalRecordId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Treatment
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading treatments...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : treatments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No treatments recorded yet.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium text-gray-900">{treatment.name}</h3>
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
                <p>Date: {format(new Date(treatment.date), 'MMM dd, yyyy')}</p>
                <p>Veterinarian: {treatment.veterinarian}</p>
                {treatment.notes && <p>Notes: {treatment.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Treatment</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Treatment Name</label>
                <input
                  type="text"
                  value={treatmentName}
                  onChange={(e) => setTreatmentName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={treatmentDate}
                  onChange={(e) => setTreatmentDate(e.target.value)}
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
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