// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { format, isPast, isToday } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Medication } from './types';
import { getMedications, addMedication } from '../../services/medicalRecordService';

interface MedicationsPanelProps {
  petId: string | null;
}

export const MedicationsPanel: React.FC<MedicationsPanelProps> = ({ petId }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [medicationName, setMedicationName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [prescribedBy, setPrescribedBy] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchMedications = async () => {
      if (!petId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getMedications(petId);
        console.log('Medications data received:', data);
        
        // Transform API data to match our component's Medication type
        const transformedMedications: Medication[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.medicationName,
          dosage: item.dosage,
          frequency: item.frequency,
          startDate: item.startDate,
          endDate: item.endDate || null,
          prescribedBy: item.prescribedBy,
          notes: item.notes || ''
        }));
        
        setMedications(transformedMedications);
      } catch (err) {
        console.error('Error fetching medications:', err);
        setError('Failed to load medications. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedications();
  }, [petId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petId) {
      // This should not happen as the parent component ensures petId is available
      console.error('Attempted to add medication without a pet ID');
      setError('System error: Unable to add medication. Please try again later.');
      return;
    }
    
    if (!medicationName || !dosage || !frequency || !startDate || !prescribedBy) {
      setError('Medication name, dosage, frequency, start date, and prescriber are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      console.log('Submitting medication with data:', {
        medicationName,
        dosage,
        frequency,
        startDate,
        endDate: endDate || null,
        prescribedBy,
        notes
      });
      
      const newMedication = await addMedication(petId, {
        medicationName,
        dosage,
        frequency,
        startDate,
        endDate: endDate || null,
        prescribedBy,
        notes
      });
      
      console.log('New medication created:', newMedication);
      
      // Transform the API response to match our component's Medication type
      const transformedMedication: Medication = {
        id: newMedication.id.toString(),
        name: newMedication.medicationName,
        dosage: newMedication.dosage,
        frequency: newMedication.frequency,
        startDate: newMedication.startDate,
        endDate: newMedication.endDate || null,
        prescribedBy: newMedication.prescribedBy,
        notes: newMedication.notes || ''
      };
      
      setMedications([...medications, transformedMedication]);
      
      // Reset form
      setMedicationName('');
      setDosage('');
      setFrequency('');
      setStartDate('');
      setEndDate('');
      setPrescribedBy('');
      setNotes('');
      setShowModal(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error adding medication:', err);
      setError('Failed to add medication. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Separate medications into current and past
  const currentMedications = medications.filter(medication => {
    if (!medication.endDate) return true;
    const endDate = new Date(medication.endDate);
    return isToday(endDate) || !isPast(endDate);
  });
  
  const pastMedications = medications.filter(medication => {
    if (!medication.endDate) return false;
    const endDate = new Date(medication.endDate);
    return isPast(endDate) && !isToday(endDate);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Medications</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!petId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading medications...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : medications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No medications recorded yet.</p>
        </div>
      ) : (
        <>
          {/* Current Medications */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Current Medications</h3>
            {currentMedications.length === 0 ? (
              <p className="text-gray-500">No current medications.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{medication.name}</h4>
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
                      <p>Dosage: {medication.dosage}</p>
                      <p>Frequency: {medication.frequency}</p>
                      <p>Start Date: {format(new Date(medication.startDate), 'MMM dd, yyyy')}</p>
                      {medication.endDate && (
                        <p>End Date: {format(new Date(medication.endDate), 'MMM dd, yyyy')}</p>
                      )}
                      <p>Prescribed By: {medication.prescribedBy}</p>
                      {medication.notes && <p>Notes: {medication.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Medications */}
          {pastMedications.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Past Medications</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-700">{medication.name}</h4>
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
                      <p>Dosage: {medication.dosage}</p>
                      <p>Frequency: {medication.frequency}</p>
                      <p>Start Date: {format(new Date(medication.startDate), 'MMM dd, yyyy')}</p>
                      {medication.endDate && (
                        <p>End Date: {format(new Date(medication.endDate), 'MMM dd, yyyy')}</p>
                      )}
                      <p>Prescribed By: {medication.prescribedBy}</p>
                      {medication.notes && <p>Notes: {medication.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Medication</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Medication Name</label>
                <input
                  type="text"
                  value={medicationName}
                  onChange={(e) => setMedicationName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="e.g., 10mg, 1 tablet"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  placeholder="e.g., Once daily, Twice weekly"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Prescribed By</label>
                <input
                  type="text"
                  value={prescribedBy}
                  onChange={(e) => setPrescribedBy(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
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