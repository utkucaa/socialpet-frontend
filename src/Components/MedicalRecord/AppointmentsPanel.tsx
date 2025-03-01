// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { format, isPast } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Edit2, Trash2, Plus } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { Appointment } from './types';
import { getAppointments, addAppointment } from '../../services/medicalRecordService';
import 'react-day-picker/dist/style.css';

interface AppointmentsPanelProps {
  medicalRecordId: string | null;
}

export const AppointmentsPanel: React.FC<AppointmentsPanelProps> = ({ medicalRecordId }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Form state
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!medicalRecordId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const data = await getAppointments(medicalRecordId);
        
        // Transform API data to match our component's Appointment type
        const transformedAppointments: Appointment[] = data.map((item: any) => ({
          id: item.id.toString(),
          date: item.appointmentDate,
          time: item.appointmentTime,
          reason: item.reason,
          veterinarian: item.veterinarian,
          notes: item.notes || ''
        }));
        
        setAppointments(transformedAppointments);
      } catch (err) {
        console.error('Error fetching appointments:', err);
        setError('Failed to load appointments. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [medicalRecordId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!medicalRecordId) {
      // This should not happen as the parent component ensures medicalRecordId is available
      console.error('Attempted to add appointment without a medical record ID');
      setError('System error: Unable to add appointment. Please try again later.');
      return;
    }
    
    if (!appointmentDate || !appointmentTime || !reason || !veterinarian) {
      setError('Date, time, reason, and veterinarian are required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const newAppointment = await addAppointment(medicalRecordId, {
        appointmentDate,
        appointmentTime,
        reason,
        veterinarian,
        notes
      });
      
      // Transform the API response to match our component's Appointment type
      const transformedAppointment: Appointment = {
        id: newAppointment.id.toString(),
        date: newAppointment.appointmentDate,
        time: newAppointment.appointmentTime,
        reason: newAppointment.reason,
        veterinarian: newAppointment.veterinarian,
        notes: newAppointment.notes || ''
      };
      
      setAppointments([...appointments, transformedAppointment]);
      
      // Reset form
      setAppointmentDate('');
      setAppointmentTime('');
      setReason('');
      setVeterinarian('');
      setNotes('');
      setShowModal(false);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Error adding appointment:', err);
      setError('Failed to add appointment. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Separate appointments into upcoming and past
  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    return !isPast(appointmentDateTime);
  });
  
  const pastAppointments = appointments.filter(appointment => {
    const appointmentDateTime = new Date(`${appointment.date}T${appointment.time}`);
    return isPast(appointmentDateTime);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          disabled={!medicalRecordId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading appointments...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointments scheduled yet.</p>
        </div>
      ) : (
        <>
          {/* Upcoming Appointments */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Upcoming Appointments</h3>
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500">No upcoming appointments.</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">{appointment.reason}</h4>
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
                      <p>Date: {format(new Date(appointment.date), 'MMM dd, yyyy')}</p>
                      <p>Time: {appointment.time}</p>
                      <p>Veterinarian: {appointment.veterinarian}</p>
                      {appointment.notes && <p>Notes: {appointment.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3">Past Appointments</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-700">{appointment.reason}</h4>
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
                      <p>Date: {format(new Date(appointment.date), 'MMM dd, yyyy')}</p>
                      <p>Time: {appointment.time}</p>
                      <p>Veterinarian: {appointment.veterinarian}</p>
                      {appointment.notes && <p>Notes: {appointment.notes}</p>}
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
            <h3 className="text-lg font-medium mb-4">Schedule New Appointment</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Veterinarian</label>
                <input
                  type="text"
                  value={veterinarian}
                  onChange={(e) => setVeterinarian(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
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
                  {isSubmitting ? 'Scheduling...' : 'Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};