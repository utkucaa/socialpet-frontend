// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPetsByOwnerId, deletePet } from '../../services/petService';
import AddPetModal from './AddPetModal';

function PetList() {
  const [pets, setPets] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchPets = async () => {
    setIsLoading(true);
    try {
      const user = localStorage.getItem('user');
      const userData = JSON.parse(user);
      const ownerId = userData.id;
      if (!ownerId) {
        throw new Error('User not authenticated');
      }
      const data = await getPetsByOwnerId(ownerId);
      setPets(data);
    } catch (err) {
      console.error('Error fetching pets:', err);
      setError('Failed to load pets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPets();
  }, []);
  
  const handleDeletePet = async (id) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      try {
        await deletePet(id);
        setPets(pets.filter(pet => pet.id !== id));
      } catch (err) {
        console.error('Error deleting pet:', err);
        alert('Failed to delete pet. Please try again.');
      }
    }
  };
  
  const handleAddPet = () => {
    setIsAddModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    fetchPets(); // Refresh the list after adding a pet
  };
  
  const getAnimalTypeIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'DOG':
        return '🐕';
      case 'CAT':
        return '🐈';
      case 'BIRD':
        return '🦜';
      default:
        return '🐾';
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading pets...</div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Pets</h1>
          <button
            onClick={handleAddPet}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <Plus className="mr-2 h-5 w-5" />
            Yeni Evcil Hayvan Ekle
          </button>
        </div>
        
        {pets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-xl text-gray-600 mb-4">You don't have any pets yet.</p>
            <button
              onClick={handleAddPet}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 inline-flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Your First Pet
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{getAnimalTypeIcon(pet.animalType)}</div>
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900">{pet.name}</h2>
                      <p className="text-gray-600">
                        {pet.age} years old • {pet.gender}
                      </p>
                      {pet.breed && <p className="text-sm text-gray-500">{pet.breed.name}</p>}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Link
                      to={`/medical-record/${pet.id}`}
                      className="px-3 py-1.5  bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Medical Record
                    </Link>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeletePet(pet.id)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <Link
                        to={`/edit-pet/${pet.id}`}
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isAddModalOpen && (
        <AddPetModal onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default PetList; 