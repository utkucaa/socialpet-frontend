// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { Allergy } from './types';
import { 
  getAllergies, 
  addAllergy, 
  updateAllergy, 
  deleteAllergy 
} from '../../services/medicalRecordService';

interface AllergiesPanelProps {
  petId: string | null;
}

export const AllergiesPanel: React.FC<AllergiesPanelProps> = ({ petId }) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [allergen, setAllergen] = useState('');
  const [reaction, setReaction] = useState('');
  const [severity, setSeverity] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingAllergy, setEditingAllergy] = useState<Allergy | null>(null);
  
  // Counter to force refresh
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Fetch allergies from backend
  const fetchAllergies = async () => {
    if (!petId) {
      setIsLoading(false);
      setAllergies([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Make API call to get allergies
      const response = await getAllergies(petId);
      
      // Handle empty or invalid response
      if (!response || !Array.isArray(response)) {
        setAllergies([]);
        return;
      }
      
      // Transform API data to match our component's Allergy type
      const transformedAllergies = response.map(item => ({
        id: item.id?.toString() || String(Math.random()),
        allergen: item.allergen || '',
        reaction: item.reaction || '',
        severity: item.severity || '',
        notes: item.notes || ''
      }));
      
      setAllergies(transformedAllergies);
    } catch (err) {
      console.error('Error fetching allergies:', err);
      setError('Failed to load allergies.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch allergies when component mounts or refreshCounter changes
  useEffect(() => {
    fetchAllergies();
  }, [petId, refreshCounter]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petId) {
      setError('Pet ID is missing');
      return;
    }
    
    if (!allergen || !reaction || !severity) {
      setError('Allergen, reaction, and severity are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create allergy data object
      const allergyData = {
        allergen,
        reaction,
        severity,
        notes
      };
      
      if (editingAllergy) {
        // Update existing allergy
        await updateAllergy(petId, editingAllergy.id, allergyData);
      } else {
        // Add new allergy
        await addAllergy(petId, allergyData);
      }
      
      // Reset form
      setAllergen('');
      setReaction('');
      setSeverity('');
      setNotes('');
      setShowModal(false);
      setEditingAllergy(null);
      
      // Force refresh by incrementing counter
      setRefreshCounter(prev => prev + 1);
    } catch (err) {
      console.error('Error saving allergy:', err);
      setError('Failed to save allergy.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEdit = (allergy: Allergy) => {
    setEditingAllergy(allergy);
    setAllergen(allergy.allergen);
    setReaction(allergy.reaction);
    setSeverity(allergy.severity);
    setNotes(allergy.notes || '');
    setShowModal(true);
  };

  // Handle delete button click
  const handleDelete = async (allergyId: string) => {
    if (!petId) {
      setError('Pet ID is missing');
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this allergy record?')) {
      return;
    }
    
    try {
      await deleteAllergy(petId, allergyId);
      // Force refresh by incrementing counter
      setRefreshCounter(prev => prev + 1);
    } catch (err) {
      console.error('Error deleting allergy:', err);
      setError('Failed to delete allergy.');
    }
  };

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-yellow-100 text-yellow-800';
      case 'moderate':
        return 'bg-orange-100 text-orange-800';
      case 'severe':
      case 'ciddi':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Allergy Records</h2>
        <button
          onClick={() => {
            setEditingAllergy(null);
            setAllergen('');
            setReaction('');
            setSeverity('');
            setNotes('');
            setShowModal(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Add Allergy
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading allergies...</p>
        </div>
      ) : allergies.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No allergy records found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Allergen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reaction
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Notes
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allergies.map((allergy) => (
                <tr key={allergy.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{allergy.allergen}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{allergy.reaction}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(allergy.severity)}`}>
                      {allergy.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{allergy.notes}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(allergy)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(allergy.id)}
                      className="text-red-600 hover:text-red-900"
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

      {/* Add/Edit Allergy Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editingAllergy ? 'Edit Allergy' : 'Add Allergy'}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="allergen">
                  Allergen
                </label>
                <input
                  id="allergen"
                  type="text"
                  value={allergen}
                  onChange={(e) => setAllergen(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter allergen name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reaction">
                  Reaction
                </label>
                <input
                  id="reaction"
                  type="text"
                  value={reaction}
                  onChange={(e) => setReaction(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter reaction symptoms"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="severity">
                  Severity
                </label>
                <select
                  id="severity"
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select severity</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                  <option value="Orta">Orta</option>
                  <option value="Ciddi">Ciddi</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="notes">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter additional notes"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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