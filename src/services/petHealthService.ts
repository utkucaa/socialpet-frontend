import axios from 'axios';

// Update the API_URL to match your backend server
const API_URL = 'http://localhost:8080/api';

// Get auth token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

// User Management for Pet Owners
export const getAllUsers = async () => {
  try {
    // Use the correct admin endpoint for fetching users based on the cURL example
    const response = await axios.get(`${API_URL}/v1/admin/users`, {
      headers: getAuthHeader()
    });
    
    // Transform the response data to match our expected format if needed
    const users = Array.isArray(response.data) ? response.data.map((user: any) => ({
      id: user.id || user.userId,
      name: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      email: user.email,
      phone: user.phoneNumber || user.phone,
      role: user.role || 'USER'
    })) : [];
    
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    // Fallback to mock data if API fails
    return getMockUsers();
  }
};

// Mock users data for development
const getMockUsers = () => {
  return [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@example.com',
      phone: '0555-111-2233',
      role: 'USER'
    },
    {
      id: '2',
      name: 'Ayşe Demir',
      email: 'ayse.demir@example.com',
      phone: '0555-222-3344',
      role: 'USER'
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@example.com',
      phone: '0555-333-4455',
      role: 'USER'
    },
    {
      id: '4',
      name: 'Zeynep Şahin',
      email: 'zeynep.sahin@example.com',
      phone: '0555-444-5566',
      role: 'USER'
    },
    {
      id: '5',
      name: 'Ali Öztürk',
      email: 'ali.ozturk@example.com',
      phone: '0555-555-6677',
      role: 'USER'
    }
  ];
};

// Pet Management
export const getAllPets = async () => {
  try {
    // For development/testing when API is not available, return mock data
    if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
      return getMockPets();
    }
    
    const response = await axios.get(`${API_URL}/pets`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pets:', error);
    // Fallback to mock data if API fails
    return getMockPets();
  }
};

// Mock data for development/testing
const getMockPets = () => {
  return [
    {
      id: '1',
      name: 'Max',
      type: 'Köpek',
      breed: 'Golden Retriever',
      ownerName: 'Ahmet Yılmaz',
      lastCheckupDate: '2023-02-15',
      nextVaccineDate: '2023-08-15',
      notes: 'Sağlıklı, yıllık kontrol yapıldı.'
    },
    {
      id: '2',
      name: 'Luna',
      type: 'Kedi',
      breed: 'British Shorthair',
      ownerName: 'Ayşe Demir',
      lastCheckupDate: '2023-03-10',
      nextVaccineDate: '2023-09-10',
      activeTreatments: ['Antibiyotik tedavisi'],
      notes: 'Kulak enfeksiyonu tedavisi devam ediyor.'
    },
    {
      id: '3',
      name: 'Buddy',
      type: 'Köpek',
      breed: 'Beagle',
      ownerName: 'Mehmet Kaya',
      lastCheckupDate: '2023-01-20',
      nextVaccineDate: '2023-07-20',
      notes: 'Aşıları tamamlandı.'
    },
    {
      id: '4',
      name: 'Milo',
      type: 'Kedi',
      breed: 'Siyam',
      ownerName: 'Zeynep Şahin',
      lastCheckupDate: '2023-02-28',
      nextVaccineDate: '2023-08-28',
      activeTreatments: ['Diyet tedavisi'],
      criticalCondition: true,
      notes: 'Böbrek yetmezliği, özel diyet uygulanıyor.'
    },
    {
      id: '5',
      name: 'Charlie',
      type: 'Köpek',
      breed: 'Pug',
      ownerName: 'Ali Öztürk',
      lastCheckupDate: '2023-03-05',
      nextVaccineDate: '2023-09-05',
      notes: 'Sağlıklı, kilo kontrolü önerildi.'
    }
  ];
};

// Rest of the service functions with mock data fallbacks

export const getPetById = async (petId: string) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching pet with ID ${petId}:`, error);
    // Return mock pet for development
    return getMockPets().find(pet => pet.id === petId);
  }
};

export const getUserPets = async () => {
  try {
    const response = await axios.get(`${API_URL}/pets/user`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user pets:', error);
    // Return mock data for development
    return getMockPets();
  }
};

export const createPet = async (petData: any) => {
  try {
    const response = await axios.post(`${API_URL}/pets`, petData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating pet:', error);
    // For development, return the data that would have been created
    return { ...petData, id: Math.random().toString(36).substring(2, 9) };
  }
};

export const updatePet = async (petId: string, petData: any) => {
  try {
    const response = await axios.put(`${API_URL}/pets/${petId}`, petData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating pet with ID ${petId}:`, error);
    // For development, return the updated data
    return { ...petData, id: petId };
  }
};

export const deletePet = async (petId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/pets/${petId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting pet with ID ${petId}:`, error);
    // For development, return success
    return { success: true };
  }
};

// Vaccination Management
export const getPetVaccinations = async (petId: string) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}/vaccinations`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching vaccinations for pet with ID ${petId}:`, error);
    // Return mock vaccinations
    return getMockVaccinations(petId);
  }
};

// Mock vaccinations data
const getMockVaccinations = (petId: string) => {
  return [
    {
      id: '1',
      petId: petId,
      vaccineName: 'Kuduz Aşısı',
      administrationDate: '2023-01-15',
      expirationDate: '2024-01-15',
      veterinarian: 'Dr. Ayşe Kaya',
      notes: 'Yıllık aşı'
    },
    {
      id: '2',
      petId: petId,
      vaccineName: 'Karma Aşı',
      administrationDate: '2023-02-10',
      expirationDate: '2023-02-10',
      veterinarian: 'Dr. Mehmet Öz',
      notes: 'Hatırlatma yapıldı'
    },
    {
      id: '3',
      petId: petId,
      vaccineName: 'Lyme Aşısı',
      administrationDate: '2023-03-05',
      expirationDate: '2024-03-05',
      veterinarian: 'Dr. Zeynep Yıldız',
      notes: ''
    }
  ];
};

// Rest of the vaccination functions with mock data fallbacks

export const createVaccination = async (petId: string, vaccinationData: any) => {
  try {
    const response = await axios.post(`${API_URL}/pets/${petId}/vaccinations`, vaccinationData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating vaccination for pet with ID ${petId}:`, error);
    return { ...vaccinationData, id: Math.random().toString(36).substring(2, 9), petId };
  }
};

export const updateVaccination = async (petId: string, vaccinationId: string, vaccinationData: any) => {
  try {
    const response = await axios.put(`${API_URL}/pets/${petId}/vaccinations/${vaccinationId}`, vaccinationData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating vaccination with ID ${vaccinationId}:`, error);
    return { ...vaccinationData, id: vaccinationId, petId };
  }
};

export const deleteVaccination = async (petId: string, vaccinationId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/pets/${petId}/vaccinations/${vaccinationId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting vaccination with ID ${vaccinationId}:`, error);
    return { success: true };
  }
};

// Treatment Management
export const getPetTreatments = async (petId: string) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}/treatments`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching treatments for pet with ID ${petId}:`, error);
    // Return mock treatments
    return getMockTreatments(petId);
  }
};

// Mock treatments data
const getMockTreatments = (petId: string) => {
  return [
    {
      id: '1',
      petId: petId,
      diagnosis: 'Kulak Enfeksiyonu',
      treatmentType: 'İlaç Tedavisi',
      treatmentDate: '2023-03-01',
      followUpDate: '2023-03-15',
      status: 'completed',
      veterinarian: 'Dr. Ayşe Kaya',
      notes: 'Günde 2 kez antibiyotik damla uygulandı. Tedavi başarıyla tamamlandı.'
    },
    {
      id: '2',
      petId: petId,
      diagnosis: 'Diş Sorunu',
      treatmentType: 'Cerrahi Müdahale',
      treatmentDate: '2023-03-10',
      followUpDate: '2023-04-10',
      status: 'ongoing',
      veterinarian: 'Dr. Mehmet Öz',
      notes: 'Diş çekimi yapıldı. İyileşme süreci devam ediyor.'
    },
    {
      id: '3',
      petId: petId,
      diagnosis: 'Alerji',
      treatmentType: 'İlaç Tedavisi',
      treatmentDate: '2023-04-15',
      followUpDate: '2023-05-15',
      status: 'scheduled',
      veterinarian: 'Dr. Zeynep Yıldız',
      notes: 'Alerjik reaksiyon için tedavi planlandı.'
    }
  ];
};

// Rest of the treatment functions with mock data fallbacks

export const createTreatment = async (petId: string, treatmentData: any) => {
  try {
    const response = await axios.post(`${API_URL}/pets/${petId}/treatments`, treatmentData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating treatment for pet with ID ${petId}:`, error);
    return { ...treatmentData, id: Math.random().toString(36).substring(2, 9), petId };
  }
};

export const updateTreatment = async (petId: string, treatmentId: string, treatmentData: any) => {
  try {
    const response = await axios.put(`${API_URL}/pets/${petId}/treatments/${treatmentId}`, treatmentData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating treatment with ID ${treatmentId}:`, error);
    return { ...treatmentData, id: treatmentId, petId };
  }
};

export const deleteTreatment = async (petId: string, treatmentId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/pets/${petId}/treatments/${treatmentId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting treatment with ID ${treatmentId}:`, error);
    return { success: true };
  }
};

// Appointment Management
export const getPetAppointments = async (petId: string) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}/appointments`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointments for pet with ID ${petId}:`, error);
    // Return mock appointments
    return getMockAppointments(petId);
  }
};

// Mock appointments data
const getMockAppointments = (petId: string) => {
  return [
    {
      id: '1',
      petId: petId,
      appointmentDate: '2023-03-15',
      appointmentTime: '10:00',
      appointmentType: 'Rutin Kontrol',
      veterinarian: 'Dr. Ayşe Kaya',
      status: 'scheduled',
      notes: 'Yıllık aşı kontrolü için randevu.'
    },
    {
      id: '2',
      petId: petId,
      appointmentDate: '2023-03-14',
      appointmentTime: '14:30',
      appointmentType: 'Diş Kontrolü',
      veterinarian: 'Dr. Mehmet Öz',
      status: 'completed',
      notes: 'Diş temizliği yapıldı.'
    },
    {
      id: '3',
      petId: petId,
      appointmentDate: '2023-03-16',
      appointmentTime: '11:15',
      appointmentType: 'Aşılama',
      veterinarian: 'Dr. Zeynep Yıldız',
      status: 'scheduled',
      notes: 'Kuduz aşısı yapılacak.'
    },
    {
      id: '4',
      petId: petId,
      appointmentDate: '2023-03-13',
      appointmentTime: '09:00',
      appointmentType: 'Acil Durum',
      veterinarian: 'Dr. Ali Demir',
      status: 'completed',
      notes: 'Kusma şikayeti ile geldi. Tedavi uygulandı.'
    },
    {
      id: '5',
      petId: petId,
      appointmentDate: '2023-03-12',
      appointmentTime: '16:45',
      appointmentType: 'Kontrol',
      veterinarian: 'Dr. Ayşe Kaya',
      status: 'no-show',
      notes: 'Hasta gelmedi.'
    }
  ];
};

export const createAppointment = async (petId: string, appointmentData: any) => {
  try {
    const response = await axios.post(`${API_URL}/pets/${petId}/appointments`, appointmentData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error creating appointment for pet with ID ${petId}:`, error);
    return { ...appointmentData, id: Math.random().toString(36).substring(2, 9), petId };
  }
};

export const updateAppointment = async (petId: string, appointmentId: string, appointmentData: any) => {
  try {
    const response = await axios.put(`${API_URL}/pets/${petId}/appointments/${appointmentId}`, appointmentData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating appointment with ID ${appointmentId}:`, error);
    return { ...appointmentData, id: appointmentId, petId };
  }
};

export const deleteAppointment = async (petId: string, appointmentId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/pets/${petId}/appointments/${appointmentId}`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting appointment with ID ${appointmentId}:`, error);
    return { success: true };
  }
};

// Medical Records
export const getAllMedicalRecords = async (petId: string) => {
  try {
    const response = await axios.get(`${API_URL}/pets/${petId}/medical-records`, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching medical records for pet with ID ${petId}:`, error);
    // Return combined mock data
    return {
      vaccinations: getMockVaccinations(petId),
      treatments: getMockTreatments(petId),
      appointments: getMockAppointments(petId)
    };
  }
}; 