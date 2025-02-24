export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird';
  age: number;
  imageUrl: string;
  breed?: string;
}

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  veterinarian: string;
}

export interface Treatment {
  id: string;
  type: 'surgery' | 'therapy' | 'other';
  description: string;
  date: string;
}

export interface Appointment {
  id: string;
  date: string;
  veterinarian: string;
  reason: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  startDate: string;
  endDate: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
}

export interface WeightRecord {
  id: string;
  date: string;
  weight: number;
}