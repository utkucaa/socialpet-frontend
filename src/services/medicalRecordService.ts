import axiosInstance from './axios';
import { 
  Vaccination, 
  Treatment, 
  Appointment, 
  Medication, 
  Allergy, 
  WeightRecord 
} from '../components/MedicalRecord/types';

// Medical Record API calls
export const createMedicalRecord = async (petId: string) => {
  const response = await axiosInstance.post('/api/medical-records', { petId });
  return response.data;
};

export const getMedicalRecord = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}`);
  return response.data;
};

export const getMedicalRecordByPetId = async (petId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/pet/${petId}`);
  return response.data;
};

export const deleteMedicalRecord = async (medicalRecordId: string) => {
  const response = await axiosInstance.delete(`/api/medical-records/${medicalRecordId}`);
  return response.data;
};

// Vaccination API calls
export const getVaccinations = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/vaccinations`);
  return response.data;
};

export const addVaccination = async (medicalRecordId: string, vaccination: { 
  vaccineName: string, 
  vaccinationDate: string, 
  veterinarian: string 
}) => {
  const response = await axiosInstance.post(
    `/api/medical-records/${medicalRecordId}/vaccinations`, 
    vaccination
  );
  return response.data;
};

// Treatment API calls
export const getTreatments = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/treatments`);
  return response.data;
};

export const addTreatment = async (medicalRecordId: string, treatment: {
  treatmentType: string,
  description: string,
  treatmentDate: string
}) => {
  const response = await axiosInstance.post(
    `/api/medical-records/${medicalRecordId}/treatments`,
    treatment
  );
  return response.data;
};

// Appointment API calls
export const getAppointments = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/appointments`);
  return response.data;
};

export const getUpcomingAppointments = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/appointments/upcoming`);
  return response.data;
};

export const addAppointment = async (medicalRecordId: string, appointment: {
  appointmentDate: string,
  veterinarian: string,
  reason: string
}) => {
  const response = await axiosInstance.post(
    `/api/medical-records/${medicalRecordId}/appointments`,
    appointment
  );
  return response.data;
};

// Medication API calls
export const getMedications = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/medications`);
  return response.data;
};

export const getCurrentMedications = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/medications/current`);
  return response.data;
};

export const addMedication = async (medicalRecordId: string, medication: {
  medicationName: string,
  dosage: string,
  startDate: string,
  endDate: string
}) => {
  const response = await axiosInstance.post(
    `/api/medical-records/${medicalRecordId}/medications`,
    medication
  );
  return response.data;
};

// Allergy API calls
export const getAllergies = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/allergies`);
  return response.data;
};

export const addAllergy = async (medicalRecordId: string, allergy: {
  allergen: string,
  reaction: string
}) => {
  const response = await axiosInstance.post(
    `/api/medical-records/${medicalRecordId}/allergies`,
    allergy
  );
  return response.data;
};

// Weight Record API calls
export const getWeightRecords = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/weight-records`);
  return response.data;
};

export const getLatestWeightRecord = async (medicalRecordId: string) => {
  const response = await axiosInstance.get(`/api/medical-records/${medicalRecordId}/weight-records/latest`);
  return response.data;
};

export const addWeightRecord = async (medicalRecordId: string, weightRecord: {
  recordDate: string,
  weight: number
}) => {
  const response = await axiosInstance.post(
    `/api/medical-records/${medicalRecordId}/weight-records`,
    weightRecord
  );
  return response.data;
}; 