// @ts-nocheck
import React from 'react';
import { Pet } from './types';
import { ChevronDown } from 'lucide-react';

interface PetHeaderProps {
  pet: Pet;
}

export const PetHeader: React.FC<PetHeaderProps> = ({ pet }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center space-x-6">
        <img
          src={pet.imageUrl}
          alt={pet.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{pet.name}</h1>
          <div className="mt-2 text-gray-600">
            <p>
              {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)} • {pet.age}{' '}
              years old
            </p>
            {pet.breed && <p className="text-sm">{pet.breed}</p>}
          </div>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center">
          Detailed Info
          <ChevronDown className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};