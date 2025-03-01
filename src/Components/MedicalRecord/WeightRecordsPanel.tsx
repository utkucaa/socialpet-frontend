// @ts-nocheck
import React, { useState, useEffect } from 'react';
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
import { getWeightRecords, addWeightRecord } from '../../services/medicalRecordService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeightRecordsPanelProps {
  medicalRecordId: string | null;
}

export const WeightRecordsPanel: React.FC<WeightRecordsPanelProps> = ({ medicalRecordId }) => {
  const [weightRecords, setWeightRecords] = useState<WeightRecord[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchWeightRecords = async () => {
      if (!medicalRecordId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getWeightRecords(medicalRecordId);
        
        // Transform API data to match our component's WeightRecord type
        const transformedWeightRecords: WeightRecord[] = data.map((item: any) => ({
          id: item.id.toString(),
          weight: parseFloat(item.weight),
          unit: item.unit.toLowerCase() as 'kg' | 'lb',
          date: item.recordDate,
          notes: item.notes || ''
        }));
        
        // Sort by date (oldest to newest)
        transformedWeightRecords.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        setWeightRecords(transformedWeightRecords);
      } catch (err) {
        console.error('Error fetching weight records:', err);
        setError('Failed to load weight records. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeightRecords();
  }, [medicalRecordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicalRecordId) {
      // This should not happen as the parent component ensures medicalRecordId is available
      console.error('Attempted to add weight record without a medical record ID');
      setError('System error: Unable to add weight record. Please try again later.');
      return;
    }
    
    if (!weight || !date) {
      setError('Weight and date are required');
      return;
    }
    
    const weightValue = parseFloat(weight);
    if (isNaN(weightValue) || weightValue <= 0) {
      setError('Please enter a valid weight value');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newWeightRecord = await addWeightRecord(medicalRecordId, {
        weight: weightValue,
        unit: unit.toUpperCase(),
        recordDate: date,
        notes
      });
      
      // Transform the API response to match our component's WeightRecord type
      const transformedWeightRecord: WeightRecord = {
        id: newWeightRecord.id.toString(),
        weight: parseFloat(newWeightRecord.weight),
        unit: newWeightRecord.unit.toLowerCase() as 'kg' | 'lb',
        date: newWeightRecord.recordDate,
        notes: newWeightRecord.notes || ''
      };
      
      // Add new record and sort by date
      const updatedRecords = [...weightRecords, transformedWeightRecord].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      setWeightRecords(updatedRecords);
      
      // Reset form
      setWeight('');
      setUnit('kg');
      setDate('');
      setNotes('');
      setShowModal(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error adding weight record:', err);
      setError('Failed to add weight record. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: weightRecords.map(record => format(new Date(record.date), 'MMM dd, yyyy')),
    datasets: [
      {
        label: 'Weight',
        data: weightRecords.map(record => record.weight),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weight History',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: weightRecords.length > 0 ? weightRecords[0].unit : 'Weight',
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Weight Records</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!medicalRecordId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Weight Record
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading weight records...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : weightRecords.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No weight records yet.</p>
        </div>
      ) : (
        <>
          {/* Weight Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <Line data={chartData} options={chartOptions} />
          </div>

          {/* Weight Records Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Weight
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {weightRecords.map((record, index) => (
                  <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(record.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.weight} {record.unit}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {record.notes || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
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
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Add New Weight Record</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Unit</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
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