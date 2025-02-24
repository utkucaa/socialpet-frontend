// @ts-nocheck
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Plus } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeightRecord } from './types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const sampleWeightRecords: WeightRecord[] = [
  { id: '1', date: '2024-01-01', weight: 25.5 },
  { id: '2', date: '2024-01-15', weight: 26.0 },
  { id: '3', date: '2024-02-01', weight: 26.2 },
  { id: '4', date: '2024-02-15', weight: 26.5 }
];

export const WeightRecordsPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const chartData = {
    labels: sampleWeightRecords.map(record => 
      format(new Date(record.date), 'MMM dd')
    ),
    datasets: [
      {
        label: 'Weight (kg)',
        data: sampleWeightRecords.map(record => record.weight),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight History'
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Weight Records</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Weight Record
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <Line options={chartOptions} data={chartData} />
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Weight (kg)</th>
              <th className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sampleWeightRecords.map((record) => (
              <tr key={record.id}>
                <td className="py-4 pl-4 pr-3 text-sm text-gray-900">
                  {format(new Date(record.date), 'MMMM dd, yyyy')}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">{record.weight} kg</td>
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
            <h3 className="text-lg font-medium mb-4">Add New Weight Record</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
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