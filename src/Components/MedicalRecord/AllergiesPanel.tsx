// @ts-nocheck
import React, { useState } from 'react';
import { Edit2, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { Allergy } from './types';

const sampleAllergies: Allergy[] = [
  {
    id: '1',
    allergen: 'Chicken',
    reaction: 'Skin irritation and itching'
  },
  {
    id: '2',
    allergen: 'Grass pollen',
    reaction: 'Sneezing and watery eyes'
  }
];

export const AllergiesPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Allergies</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Allergy
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sampleAllergies.map((allergy) => (
          <div
            key={allergy.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <h3 className="font-medium text-gray-900">{allergy.allergen}</h3>
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
            <div className="text-sm text-gray-600">
              <p>Reaction: {allergy.reaction}</p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Allergy</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergen</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reaction</label>
                <textarea
                  rows={3}
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