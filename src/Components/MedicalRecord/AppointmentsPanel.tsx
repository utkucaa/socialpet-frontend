// @ts-nocheck
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Edit2, Trash2, Plus } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { Appointment } from './types';
import 'react-day-picker/dist/style.css';

const sampleAppointments: Appointment[] = [
  {
    id: '1',
    date: '2024-03-15T10:00:00',
    veterinarian: 'Dr. Smith',
    reason: 'Annual checkup'
  },
  {
    id: '2',
    date: '2024-03-20T14:30:00',
    veterinarian: 'Dr. Johnson',
    reason: 'Vaccination'
  }
];

export const AppointmentsPanel: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {sampleAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{format(new Date(appointment.date), 'MMMM dd, yyyy')}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{format(new Date(appointment.date), 'h:mm a')}</span>
                  </div>
                  <h3 className="font-medium text-gray-900">{appointment.reason}</h3>
                  <p className="text-sm text-gray-600">with {appointment.veterinarian}</p>
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
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            className="mx-auto"
          />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Schedule New Appointment</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
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
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};