// @ts-nocheck
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus, Calendar } from 'lucide-react';
import { Medication } from './types';

const sampleMedications: Medication[] = [
  {
    id: '1',
    name: 'Antibiotics',
    dosage: '500mg twice daily',
    startDate: '2024-02-15',
    endDate: '2024-02-25'
  },
  {
    id: '2',
    name: 'Pain Relief',
    dosage: '250mg as needed',
    startDate: '2024-02-10',
    endDate: '2024-02-17'
  }
];

export const MedicationsPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Medications</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Medication
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleMedications.map((medication) => (
          <div
            key={medication.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-medium text-gray-900">{medication.name}</h3>
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
              <p className="font-medium">Dosage: {medication.dosage}</p>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(new Date(medication.startDate), 'MMM dd')} -{' '}
                  {format(new Date(medication.endDate), 'MMM dd, yyyy')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Medication</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medication Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};