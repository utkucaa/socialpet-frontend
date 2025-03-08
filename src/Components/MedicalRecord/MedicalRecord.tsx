// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PetHeader } from './PetHeader';
import { TabNavigation } from './TabNavigation';
import { VaccinationsPanel } from './VaccinationsPanel';
import { TreatmentsPanel } from './TreatmentsPanel';
import { AppointmentsPanel } from './AppointmentsPanel';
import { MedicationsPanel } from './MedicationsPanel';
import { AllergiesPanel } from './AllergiesPanel';
import { WeightRecordsPanel } from './WeightRecordsPanel';
import { getPetById } from '../../services/petService';
import { getAllMedicalRecords } from '../../services/medicalRecordService';
import { Pet } from './types';

function MedicalRecord() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMedicalRecordLoading, setIsMedicalRecordLoading] = useState(true);

  // Redirect to pets page if no petId is provided
  useEffect(() => {
    if (!petId) {
      navigate('/pets');
    }
  }, [petId, navigate]);

  useEffect(() => {
    const fetchPetAndMedicalRecord = async () => {
      try {
        if (!petId) {
          return; // Skip fetching if no petId (we'll redirect anyway)
        }
        
        console.log('Fetching pet data for petId:', petId);
        
        // Fetch pet data
        const petData = await getPetById(petId);
        console.log('Pet data received:', petData);
        
        if (!petData || !petData.id) {
          throw new Error('Pet not found or invalid pet data received');
        }
        
        // Transform the API pet data to match our component's Pet type
        const transformedPet: Pet = {
          id: petData.id.toString(),
          name: petData.name,
          type: petData.animalType.toLowerCase(),
          age: petData.age,
          imageUrl: petData.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
          breed: petData.breed?.name,
        };
        
        setPet(transformedPet);
        setIsLoading(false);
        
        // Fetch medical records
        setIsMedicalRecordLoading(true);
        
        try {
          console.log('Fetching medical records for pet ID:', petId);
          // Get all medical records for the pet
          await getAllMedicalRecords(petId);
          setIsMedicalRecordLoading(false);
        } catch (err) {
          console.error('Error fetching medical records:', err);
          setError('Failed to load medical records. Please try again later.');
          setIsMedicalRecordLoading(false);
        }
      } catch (err) {
        console.error('Error fetching pet information:', err);
        setError('Failed to load pet information. Please try again later.');
        setIsLoading(false);
        setIsMedicalRecordLoading(false);
      }
    };

    fetchPetAndMedicalRecord();
  }, [petId]);

  // If loading, show loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link to="/pets" className="text-blue-500 hover:underline">
          Return to Pets
        </Link>
      </div>
    );
  }

  // If no pet data, show message
  if (!pet) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-gray-500 text-xl mb-4">Pet not found</div>
        <Link to="/pets" className="text-blue-500 hover:underline">
          Return to Pets
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PetHeader pet={pet} />
      
      <div className="mt-8">
          <TabNavigation>
            <Tab.Panel><VaccinationsPanel petId={petId} /></Tab.Panel>
            <Tab.Panel><TreatmentsPanel petId={petId} /></Tab.Panel>
            <Tab.Panel><AppointmentsPanel petId={petId} /></Tab.Panel>
            <Tab.Panel><MedicationsPanel petId={petId} /></Tab.Panel>
            <Tab.Panel><AllergiesPanel petId={petId} /></Tab.Panel>
            <Tab.Panel><WeightRecordsPanel petId={petId} /></Tab.Panel>
          </TabNavigation>
        </div>
    </div>
  );
}

export default MedicalRecord;