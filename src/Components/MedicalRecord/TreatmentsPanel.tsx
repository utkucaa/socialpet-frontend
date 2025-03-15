// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Treatment } from './types';
import { 
  getTreatments, 
  addTreatment, 
  updateTreatment, 
  deleteTreatment 
} from '../../services/medicalRecordService';

interface TreatmentsPanelProps {
  petId: string | null;
}

export const TreatmentsPanel: React.FC<TreatmentsPanelProps> = ({ petId }) => {
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [treatmentType, setTreatmentType] = useState('');
  const [description, setDescription] = useState('');
  const [treatmentDate, setTreatmentDate] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<Treatment | null>(null);
  
  // Counter to force refresh
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Fetch treatments from backend
  const fetchTreatments = async () => {
    if (!petId) {
      setIsLoading(false);
      setTreatments([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Make API call to get treatments
      const response = await getTreatments(petId);
      
      // Handle empty or invalid response
      if (!response || !Array.isArray(response)) {
        setTreatments([]);
        return;
      }
      
      // Transform API data to match our component's Treatment type
      const transformedTreatments = response.map(item => ({
        id: item.id?.toString() || String(Math.random()),
        type: item.treatmentType || '',
        description: item.description || '',
        date: item.treatmentDate || '',
        veterinarian: item.veterinarian || ''
      }));
      
      setTreatments(transformedTreatments);
    } catch (err) {
      console.error('Error fetching treatments:', err);
      setError('Failed to load treatments.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch treatments when component mounts or refreshCounter changes
  useEffect(() => {
    fetchTreatments();
  }, [petId, refreshCounter]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petId) {
      setError('Pet ID is missing');
      return;
    }
    
    if (!treatmentType || !description || !treatmentDate || !veterinarian) {
      setError('All fields are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create treatment data object
      const treatmentData = {
        treatmentType,
        description,
        treatmentDate,
        veterinarian
      };
      
      if (editingTreatment) {
        // Update existing treatment
        await updateTreatment(petId, editingTreatment.id, treatmentData);
      } else {
        // Add new treatment
        await addTreatment(petId, treatmentData);
      }
      
      // Reset form
      setTreatmentType('');
      setDescription('');
      setTreatmentDate('');
      setVeterinarian('');
      setShowModal(false);
      setEditingTreatment(null);
      
      // Force refresh by incrementing counter
      setRefreshCounter(prev => prev + 1);
    } catch (err) {
      console.error('Error saving treatment:', err);
      setError('Failed to save treatment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (treatment: Treatment) => {
    setEditingTreatment(treatment);
    setTreatmentType(treatment.type);
    setDescription(treatment.description);
    setTreatmentDate(treatment.date);
    setVeterinarian(treatment.veterinarian);
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (treatmentId: string) => {
    if (!petId) {
      setError('Pet ID is missing');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this treatment record?')) {
      return;
    }
    
    try {
      await deleteTreatment(petId, treatmentId);
      // Force refresh by incrementing counter
      setRefreshCounter(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting treatment:', err);
      setError('Failed to delete treatment.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Treatment Records</h2>
        <button
          onClick={() => {
            setEditingTreatment(null);
            setTreatmentType('');
            setDescription('');
            setTreatmentDate('');
            setVeterinarian('');
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Tedavi Ekle
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
          <p className="mt-2 text-gray-500">Loading treatments...</p>
        </div>
      ) : treatments.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No treatment records found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Treatment Type
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
              {treatments.map((treatment) => (
                <tr key={treatment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{treatment.type}</div>
                    <div className="text-sm text-gray-500">{treatment.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {treatment.date ? format(new Date(treatment.date), 'MMM d, yyyy') : 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{treatment.veterinarian}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(treatment)}
                      className="text-purple-600 hover:text-purple-700 mr-4"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(treatment.id)}
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

      {/* Add/Edit Treatment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingTreatment ? 'Edit Treatment' : 'Add Treatment'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatmentType">
                  Treatment Type
                </label>
                <input
                  id="treatmentType"
                  type="text"
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter treatment type"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter treatment description"
                  rows={3}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="treatmentDate">
                  Treatment Date
                </label>
                <input
                  id="treatmentDate"
                  type="date"
                  value={treatmentDate}
                  onChange={(e) => setTreatmentDate(e.target.value)}
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
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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