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
  petId: string | null;
}

export const WeightRecordsPanel: React.FC<WeightRecordsPanelProps> = ({ petId }) => {
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

  const fetchWeightRecords = async () => {
    if (!petId) {
      console.log('No pet ID provided, skipping weight records fetch');
      setIsLoading(false);
      return;
    }
    
    console.log(`Fetching weight records for pet ID: ${petId}`);
    
    try {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      
      const data = await getWeightRecords(petId);
      
      console.log('Weight records data received:', data);
      
      if (!data) {
        console.warn('No data received from weight records API');
        setWeightRecords([]);
        setIsLoading(false);
        return;
      }
      
      if (!Array.isArray(data)) {
        console.warn('Unexpected data format received from weight records API:', data);
        setError('Received invalid data format from server');
        setIsLoading(false);
        return;
      }
      
      // Transform API data to match our component's WeightRecord type
      const transformedWeightRecords: WeightRecord[] = data.map((item: any) => {
        console.log('Processing weight record item:', item);
        
        // Handle potential missing or invalid data
        const weightValue = parseFloat(item.weight);
        if (isNaN(weightValue)) {
          console.warn('Invalid weight value:', item.weight);
        }
        
        return {
          id: item.id ? item.id.toString() : Math.random().toString(),
          weight: isNaN(weightValue) ? 0 : weightValue,
          unit: (item.unit || 'kg').toLowerCase() as 'kg' | 'lb',
          date: item.recordDate || new Date().toISOString().split('T')[0],
          notes: item.notes || ''
        };
      });
      
      // Sort by date (oldest to newest)
      transformedWeightRecords.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      console.log('Transformed weight records:', transformedWeightRecords);
      setWeightRecords(transformedWeightRecords);
    } catch (err) {
      console.error('Error fetching weight records:', err);
      console.error('Error details:', err.response?.data || err.message);
      setError('Failed to load weight records. Please try again later.');
      setWeightRecords([]); // Reset weight records on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeightRecords();
  }, [petId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!petId) {
      // This should not happen as the parent component ensures petId is available
      console.error('Attempted to add weight record without a pet ID');
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
      
      console.log('Submitting weight record with data:', {
        weight: weightValue,
        unit: unit.toUpperCase(),
        recordDate: date,
        notes
      });
      
      const newWeightRecord = await addWeightRecord(petId, {
        weight: weightValue,
        unit: unit.toUpperCase(),
        recordDate: date,
        notes
      });
      
      console.log('New weight record created:', newWeightRecord);
      
      // Reset form
      setWeight('');
      setUnit('kg');
      setDate('');
      setNotes('');
      setShowModal(false);
      setError(null); // Clear any previous errors
      
      // Refresh the weight records list
      await fetchWeightRecords();
      
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
          disabled={!petId}
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
                {weightRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(record.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 min-w-0 block w-full rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'kg' | 'lb')}
                    className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
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