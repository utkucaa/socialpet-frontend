// @ts-nocheck
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Treatment } from './types';

const sampleTreatments: Treatment[] = [
  {
    id: '1',
    type: 'surgery',
    description: 'Dental cleaning and extraction',
    date: '2024-02-10'
  },
  {
    id: '2',
    type: 'therapy',
    description: 'Physical therapy for hip dysplasia',
    date: '2024-02-01'
  }
];

export const TreatmentsPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Treatment History</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Treatment
        </button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Type</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sampleTreatments.map((treatment) => (
              <tr key={treatment.id}>
                <td className="py-4 pl-4 pr-3 text-sm">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                    treatment.type === 'surgery' 
                      ? 'bg-red-100 text-red-800'
                      : treatment.type === 'therapy'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {treatment.type.charAt(0).toUpperCase() + treatment.type.slice(1)}
                  </span>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">{treatment.description}</td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {format(new Date(treatment.date), 'MMM dd, yyyy')}
                </td>
                <td className="py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Treatment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="surgery">Surgery</option>
                  <option value="therapy">Therapy</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
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