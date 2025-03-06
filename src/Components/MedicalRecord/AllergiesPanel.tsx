// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { Allergy } from './types';
import { getAllergies, addAllergy } from '../../services/medicalRecordService';

interface AllergiesPanelProps {
  medicalRecordId: string | null;
}

export const AllergiesPanel: React.FC<AllergiesPanelProps> = ({ medicalRecordId }) => {
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [allergyName, setAllergyName] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchAllergies = async () => {
    if (!medicalRecordId) {
      console.log('No medical record ID provided, skipping allergies fetch');
      setIsLoading(false);
      return;
    }
    
    console.log(`Fetching allergies for medical record ID: ${medicalRecordId}`);
    
    try {
      setIsLoading(true);
      const data = await getAllergies(medicalRecordId);
      
      console.log('Allergies data received:', data);
      
      if (!data) {
        console.warn('No data received from allergies API');
        setAllergies([]);
        setIsLoading(false);
        return;
      }
      
      if (!Array.isArray(data)) {
        console.warn('Unexpected data format received from allergies API:', data);
        setError('Received invalid data format from server');
        setIsLoading(false);
        return;
      }
      
      // Transform API data to match our component's Allergy type
      const transformedAllergies: Allergy[] = data.map((item: any) => {
        console.log('Processing allergy item:', item);
        return {
          id: item.id.toString(),
          name: item.allergyName || item.allergen || '',
          severity: (item.severity || 'mild').toLowerCase() as 'mild' | 'moderate' | 'severe',
          symptoms: item.symptoms || item.reaction || '',
          notes: item.notes || ''
        };
      });
      
      console.log('Transformed allergies:', transformedAllergies);
      setAllergies(transformedAllergies);
    } catch (err) {
      console.error('Error fetching allergies:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to load allergies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllergies();
  }, [medicalRecordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicalRecordId) {
      // This should not happen as the parent component ensures medicalRecordId is available
      console.error('Attempted to add allergy without a medical record ID');
      setError('System error: Unable to add allergy. Please try again later.');
      return;
    }
    
    if (!allergyName || !severity || !symptoms) {
      setError('Allergy name, severity, and symptoms are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newAllergy = await addAllergy(medicalRecordId, {
        allergen: allergyName,
        reaction: symptoms,
        severity: severity.charAt(0).toUpperCase() + severity.slice(1), // Capitalize first letter
        notes: notes
      });
      
      // Reset form
      setAllergyName('');
      setSeverity('mild');
      setSymptoms('');
      setNotes('');
      setShowModal(false);
      setError(null); // Clear any previous errors
      
      // Refresh the allergies list
      await fetchAllergies();
      
    } catch (err) {
      console.error('Error adding allergy:', err);
      setError('Failed to add allergy. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get severity badge color
  const getSeverityColor = (severity: 'mild' | 'moderate' | 'severe') => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Allergies</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!medicalRecordId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Allergy
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading allergies...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : allergies.length === 0 ? (
        <div className="text-center py-8 bg-green-50 rounded-lg p-6">
          <AlertTriangle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-green-700 font-medium">No known allergies recorded.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-900">{allergy.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getSeverityColor(allergy.severity)}`}>
                    {allergy.severity.charAt(0).toUpperCase() + allergy.severity.slice(1)}
                  </span>
                </div>
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
                <p>Symptoms: {allergy.symptoms}</p>
                {allergy.notes && <p>Notes: {allergy.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Allergy</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergy Name</label>
                <input
                  type="text"
                  value={allergyName}
                  onChange={(e) => setAllergyName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as 'mild' | 'moderate' | 'severe')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="mild">Mild</option>
                  <option value="moderate">Moderate</option>
                  <option value="severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Symptoms</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={2}
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