import axiosInstance from './axios';
import { 
  Vaccination, 
  Treatment, 
  Appointment, 
  Medication, 
  Allergy, 
  WeightRecord 
} from '../components/MedicalRecord/types';

// Get all medical records for a pet
export const getAllMedicalRecords = async (petId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllMedicalRecords:', error);
    throw error;
  }
};

// Treatment API calls
export const getTreatments = async (petId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/treatments`);
    return response.data;
  } catch (error) {
    console.error('Error in getTreatments:', error);
    throw error;
  }
};

export const getTreatment = async (petId: string, treatmentId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/treatments/${treatmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getTreatment:', error);
    throw error;
  }
};

export const addTreatment = async (petId: string, treatment: {
  treatmentType: string,
  description: string,
  treatmentDate: string,
  veterinarian: string
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/pets/${petId}/medical-records/treatments`,
      treatment
    );
    return response.data;
  } catch (error) {
    console.error('Error in addTreatment:', error);
    throw error;
  }
};

export const updateTreatment = async (petId: string, treatmentId: string, treatment: {
  treatmentType: string,
  description: string,
  treatmentDate: string,
  veterinarian: string
}) => {
  try {
    const response = await axiosInstance.put(
      `/api/pets/${petId}/medical-records/treatments/${treatmentId}`,
      treatment
    );
    return response.data;
  } catch (error) {
    console.error('Error in updateTreatment:', error);
    throw error;
  }
};

export const deleteTreatment = async (petId: string, treatmentId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/pets/${petId}/medical-records/treatments/${treatmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteTreatment:', error);
    throw error;
  }
};

// Vaccination API calls
export const getVaccinations = async (petId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/vaccinations`);
    return response.data;
  } catch (error) {
    console.error('Error in getVaccinations:', error);
    throw error;
  }
};

export const getVaccination = async (petId: string, vaccinationId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/vaccinations/${vaccinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getVaccination:', error);
    throw error;
  }
};

export const addVaccination = async (petId: string, vaccination: { 
  vaccineName: string, 
  vaccinationDate: string, 
  veterinarian: string 
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/pets/${petId}/medical-records/vaccinations`, 
      vaccination
    );
    return response.data;
  } catch (error) {
    console.error('Error in addVaccination:', error);
    throw error;
  }
};

export const updateVaccination = async (petId: string, vaccinationId: string, vaccination: { 
  vaccineName: string, 
  vaccinationDate: string, 
  veterinarian: string 
}) => {
  try {
    const response = await axiosInstance.put(
      `/api/pets/${petId}/medical-records/vaccinations/${vaccinationId}`, 
      vaccination
    );
    return response.data;
  } catch (error) {
    console.error('Error in updateVaccination:', error);
    throw error;
  }
};

export const deleteVaccination = async (petId: string, vaccinationId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/pets/${petId}/medical-records/vaccinations/${vaccinationId}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteVaccination:', error);
    throw error;
  }
};

// Allergy API calls
export const getAllergies = async (petId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/allergies`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllergies:', error);
    throw error;
  }
};

export const getAllergy = async (petId: string, allergyId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/allergies/${allergyId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllergy:', error);
    throw error;
  }
};

export const addAllergy = async (petId: string, allergy: {
  allergen: string,
  reaction: string,
  severity: string,
  notes?: string
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/pets/${petId}/medical-records/allergies`,
      allergy
    );
    return response.data;
  } catch (error) {
    console.error('Error in addAllergy:', error);
    throw error;
  }
};

export const updateAllergy = async (petId: string, allergyId: string, allergy: {
  allergen: string,
  reaction: string,
  severity: string,
  notes?: string
}) => {
  try {
    const response = await axiosInstance.put(
      `/api/pets/${petId}/medical-records/allergies/${allergyId}`,
      allergy
    );
    return response.data;
  } catch (error) {
    console.error('Error in updateAllergy:', error);
    throw error;
  }
};

export const deleteAllergy = async (petId: string, allergyId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/pets/${petId}/medical-records/allergies/${allergyId}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteAllergy:', error);
    throw error;
  }
};

// Appointment API calls
export const getAppointments = async (petId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/appointments`);
    return response.data;
  } catch (error) {
    console.error('Error in getAppointments:', error);
    throw error;
  }
};

export const getAppointment = async (petId: string, appointmentId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getAppointment:', error);
    throw error;
  }
};

export const addAppointment = async (petId: string, appointment: {
  appointmentDate: string,
  veterinarian: string,
  reason: string
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/pets/${petId}/medical-records/appointments`,
      appointment
    );
    return response.data;
  } catch (error) {
    console.error('Error in addAppointment:', error);
    throw error;
  }
};

export const updateAppointment = async (petId: string, appointmentId: string, appointment: {
  appointmentDate: string,
  veterinarian: string,
  reason: string
}) => {
  try {
    const response = await axiosInstance.put(
      `/api/pets/${petId}/medical-records/appointments/${appointmentId}`,
      appointment
    );
    return response.data;
  } catch (error) {
    console.error('Error in updateAppointment:', error);
    throw error;
  }
};

export const deleteAppointment = async (petId: string, appointmentId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/pets/${petId}/medical-records/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteAppointment:', error);
    throw error;
  }
};

// Weight Record API calls
export const getWeightRecords = async (petId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/weight-records`);
    return response.data;
  } catch (error) {
    console.error('Error in getWeightRecords:', error);
    throw error;
  }
};

export const getWeightRecord = async (petId: string, weightRecordId: string) => {
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/weight-records/${weightRecordId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getWeightRecord:', error);
    throw error;
  }
};

export const addWeightRecord = async (petId: string, weightRecord: {
  recordDate: string,
  weight: number,
  unit: string,
  notes?: string
}) => {
  try {
    const response = await axiosInstance.post(
      `/api/pets/${petId}/medical-records/weight-records`,
      weightRecord
    );
    return response.data;
  } catch (error) {
    console.error('Error in addWeightRecord:', error);
    throw error;
  }
};

export const updateWeightRecord = async (petId: string, weightRecordId: string, weightRecord: {
  recordDate: string,
  weight: number,
  unit: string,
  notes?: string
}) => {
  try {
    const response = await axiosInstance.put(
      `/api/pets/${petId}/medical-records/weight-records/${weightRecordId}`,
      weightRecord
    );
    return response.data;
  } catch (error) {
    console.error('Error in updateWeightRecord:', error);
    throw error;
  }
};

export const deleteWeightRecord = async (petId: string, weightRecordId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/pets/${petId}/medical-records/weight-records/${weightRecordId}`);
    return response.data;
  } catch (error) {
    console.error('Error in deleteWeightRecord:', error);
    throw error;
  }
};

// For backward compatibility - these will be deprecated
export const getUpcomingAppointments = async (petId: string) => {
  console.warn('getUpcomingAppointments is deprecated, use getAppointments instead');
  return getAppointments(petId);
};

export const getLatestWeightRecord = async (petId: string) => {
  console.warn('getLatestWeightRecord is deprecated, use getWeightRecords instead');
  const records = await getWeightRecords(petId);
  return records.length > 0 ? records[0] : null;
};

// Medication API calls - keeping for backward compatibility
export const getMedications = async (petId: string) => {
  console.warn('getMedications is deprecated and may not work with the new API');
  try {
    const response = await axiosInstance.get(`/api/pets/${petId}/medical-records/medications`);
    return response.data;
  } catch (error) {
    console.error('Error in getMedications:', error);
    return [];
  }
};

export const getCurrentMedications = async (petId: string) => {
  console.warn('getCurrentMedications is deprecated and may not work with the new API');
  return getMedications(petId);
};

export const addMedication = async (petId: string, medication: {
  medicationName: string,
  dosage: string,
  startDate: string,
  endDate: string
}) => {
  console.warn('addMedication is deprecated and may not work with the new API');
  try {
    const response = await axiosInstance.post(
      `/api/pets/${petId}/medical-records/medications`,
      medication
    );
    return response.data;
  } catch (error) {
    console.error('Error in addMedication:', error);
    throw error;
  }
}; 