// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { 
  createPet, 
  getAnimalTypes, 
  getBreedsByAnimalType 
} from '../../services/petService';

interface AddPetModalProps {
  onClose: () => void;
}

const AddPetModal: React.FC<AddPetModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    animalType: '',
    breedId: ''
  });
  
  const [animalTypes, setAnimalTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get owner ID from JWT token
  const getOwnerId = () => {
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user);
    const ownerId = userData.id;
    
    if (!ownerId) return null;
    return ownerId;
  };
  
  // Fetch animal types on component mount
  useEffect(() => {
    const fetchAnimalTypes = async () => {
      try {
        const data = await getAnimalTypes();
        setAnimalTypes(data);
      } catch (err) {
        console.error('Error fetching animal types:', err);
        setError('Failed to load animal types. Please try again.');
      }
    };
    
    fetchAnimalTypes();
  }, []);
  
  // Fetch breeds when animal type changes
  useEffect(() => {
    const fetchBreeds = async () => {
      if (!formData.animalType) {
        setBreeds([]);
        return;
      }
      
      try {
        const data = await getBreedsByAnimalType(formData.animalType == "Köpek" ? "DOG" : formData.animalType == "Kedi" ? "CAT" : formData.animalType == "Kuş" ? "BIRD" : "");
        setBreeds(data);
      } catch (err) {
        console.error('Error fetching breeds:', err);
        setError('Failed to load breeds. Please try again.');
      }
    };
    
    fetchBreeds();
  }, [formData.animalType]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset breed when animal type changes
    if (name === 'animalType') {
      setFormData(prev => ({ ...prev, breedId: '' }));
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const ownerId = getOwnerId();
      if (!ownerId) {
        throw new Error('User not authenticated');
      }
      
      // Validate form data
      if (!formData.name.trim()) {
        throw new Error('Pet name is required');
      }
      
      if (!formData.age || isNaN(formData.age) || parseInt(formData.age) < 0) {
        throw new Error('Please enter a valid age');
      }
      
      if (!formData.gender) {
        throw new Error('Gender is required');
      }
      
      if (!formData.animalType) {
        throw new Error('Animal type is required');
      }
      
      if (!formData.breedId) {
        throw new Error('Breed is required');
      }
      
      // Create pet object
      const petData = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        animalType: formData.animalType == "Köpek" ? "DOG" : formData.animalType == "Kedi" ? "CAT" : formData.animalType == "Kuş" ? "BIRD" : "",
        ownerId: ownerId,
        breedId: parseInt(formData.breedId)
      };
      
      await createPet(petData);
      onClose();
    } catch (err) {
      console.error('Error creating pet:', err);
      setError(err.message || 'Failed to create pet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Add New Pet</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Pet Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Pet Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age (years) *
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="0"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender *
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Cinsiyet Seçin</option>
                <option value="Male">Erkek</option>
                <option value="Female">Dişi</option>
              </select>
            </div>
            
            {/* Animal Type */}
            <div>
              <label htmlFor="animalType" className="block text-sm font-medium text-gray-700">
                Animal Type *
              </label>
              <select
                id="animalType"
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Hayvan Cinsi Seçin</option>
                {animalTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Breed */}
            <div>
              <label htmlFor="breedId" className="block text-sm font-medium text-gray-700">
                Breed *
              </label>
              <select
                id="breedId"
                name="breedId"
                value={formData.breedId}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled={!formData.animalType}
                required
              >
                <option value="">{formData.animalType} Cinsi Seçin</option>
                {breeds.map((breed) => (
                  <option key={breed.id} value={breed.id}>
                    {breed.name}
                  </option>
                ))}
              </select>
              {!formData.animalType && (
                <p className="mt-1 text-sm text-gray-500">
                  Lütfen hayvan cinsi seçin
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              İptal Et
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Ekleme Yapılıyor...' : 'Hayvan Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal; 