import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Vaccination } from './types';

const sampleVaccinations: Vaccination[] = [
  {
    id: '1',
    name: 'Rabies Vaccine',
    date: '2024-02-15',
    veterinarian: 'Dr. Smith'
  },
  {
    id: '2',
    name: 'DHPP',
    date: '2024-01-20',
    veterinarian: 'Dr. Johnson'
  }
];

export const VaccinationsPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Vaccination Records</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Vaccination
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleVaccinations.map((vaccination) => (
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Vaccination</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Vaccine Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Veterinarian</label>
                <input
                  type="text"
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