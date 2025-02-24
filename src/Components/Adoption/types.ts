export interface AdoptionData {
  animalType: string;
  petName: string;
  breed: string;
  age: string | number;
  gender: string;
  size: string;
  title: string;
  description: string;
  source?: string;
  city: string;
  district: string;
  fullName: string;
  phone: string;
  photo?: File;
  [key: string]: any;
} 