import axiosInstance from './axios';

// Types
export interface Pet {
  id?: string;
  name: string;
  age: number;
  gender: string;
  animalType: string;
  ownerId?: number;
  breedId: number;
  imageUrl?: string;
}

export interface Breed {
  id: number;
  name: string;
  animalType: string;
}

export interface AnimalType {
  name: string;
}

// Pet API calls
export const getPets = async () => {
  const response = await axiosInstance.get('/api/pets');
  return response.data;
};

export const getPetById = async (id: string) => {
  const response = await axiosInstance.get(`/api/pets/${id}`);
  return response.data;
};

export const getPetsByOwnerId = async (ownerId: number) => {
  const response = await axiosInstance.get(`/api/pets/owner/${ownerId}`);
  return response.data;
};

export const createPet = async (pet: Pet) => {
  const response = await axiosInstance.post('/api/pets', pet);
  return response.data;
};

export const updatePet = async (id: string, pet: Pet) => {
  const response = await axiosInstance.put(`/api/pets/${id}`, pet);
  return response.data;
};

export const deletePet = async (id: string) => {
  const response = await axiosInstance.delete(`/api/pets/${id}`);
  return response.data;
};

// Breed API calls
export const getBreeds = async () => {
  const response = await axiosInstance.get('/api/breeds');
  return response.data;
};

export const getBreedsByAnimalType = async (animalType: string) => {
  const response = await axiosInstance.get(`/api/breeds/by-animal-type/${animalType}`);
  return response.data;
};

export const getAnimalTypes = async () => {
  const response = await axiosInstance.get('/api/breeds/animal-types');
  return response.data;
}; 