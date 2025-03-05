// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { PetHeader } from './PetHeader';
import { TabNavigation } from './TabNavigation';
import { VaccinationsPanel } from './VaccinationsPanel';
import { TreatmentsPanel } from './TreatmentsPanel';
import { AppointmentsPanel } from './AppointmentsPanel';
import { MedicationsPanel } from './MedicationsPanel';
import { AllergiesPanel } from './AllergiesPanel';
import { WeightRecordsPanel } from './WeightRecordsPanel';
import { getPetById } from '../../services/petService';
import { getMedicalRecord, getMedicalRecordByPetId, createMedicalRecord } from '../../services/medicalRecordService';
import { Pet } from './types';

function MedicalRecord() {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [medicalRecordId, setMedicalRecordId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMedicalRecordLoading, setIsMedicalRecordLoading] = useState(true);

  useEffect(() => {
    const fetchPetAndMedicalRecord = async () => {
      try {
        if (!petId) {
          throw new Error('Pet ID is required');
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
        
        // Fetch or create medical record
        setIsMedicalRecordLoading(true);
        
        try {
          console.log('Fetching medical record by pet ID:', petId);
          // First try to get the medical record by pet ID
          const medicalRecord = await getMedicalRecordByPetId(petId);
          
          if (medicalRecord && medicalRecord.id) {
            console.log('Medical record found:', medicalRecord);
            setMedicalRecordId(medicalRecord.id.toString());
          } else {
            console.log('No medical record found, creating new one');
            // If no medical record exists, create one
            const newRecord = await createMedicalRecord(petId);
            console.log('New medical record created:', newRecord);
            setMedicalRecordId(newRecord.id.toString());
          }
        } catch (err) {
          console.error('Error fetching medical record:', err);
          
          try {
            console.log('Creating new medical record for pet');
            const newRecord = await createMedicalRecord(petId);
            console.log('New medical record created:', newRecord);
            setMedicalRecordId(newRecord.id.toString());
          } catch (createErr) {
            console.error('Error creating medical record:', createErr);
            setError('Failed to create medical record. Please try again later.');
          }
        } finally {
          setIsMedicalRecordLoading(false);
        }
      } catch (err) {
        console.error('Error fetching pet or medical record:', err);
        setError('Failed to load pet information. Please try again later.');
        setIsLoading(false);
        setIsMedicalRecordLoading(false);
      }
    };

    fetchPetAndMedicalRecord();
  }, [petId]);

  // Function to manually refresh the medical record
  const refreshMedicalRecord = async () => {
    if (!petId) return;
    
    try {
      setIsMedicalRecordLoading(true);
      
      const medicalRecord = await getMedicalRecordByPetId(petId);
      
      if (medicalRecord && medicalRecord.id) {
        setMedicalRecordId(medicalRecord.id.toString());
      } else {
        const newRecord = await createMedicalRecord(petId);
        setMedicalRecordId(newRecord.id.toString());
      }
    } catch (err) {
      console.error('Error refreshing medical record:', err);
      setError('Failed to refresh medical record');
    } finally {
      setIsMedicalRecordLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading pet information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate('/pets')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Pets
        </button>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="text-xl text-red-600 mb-4">Pet not found</div>
        <button
          onClick={() => navigate('/pets')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Back to Pets
        </button>
      </div>
    );
  }

  if (isMedicalRecordLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading medical record...</p>
      </div>
    );
  }

  if (!medicalRecordId) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Unable to load or create medical record. Please try again later.</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          onClick={refreshMedicalRecord}
        >
          Try Again
        </button>
      </div>
    );
  }

  console.log('Rendering MedicalRecord with medicalRecordId:', medicalRecordId);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PetHeader pet={pet} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Medical Record</h1>
          
          <TabNavigation>
            <Tab.Panel><VaccinationsPanel medicalRecordId={medicalRecordId} /></Tab.Panel>
            <Tab.Panel><TreatmentsPanel medicalRecordId={medicalRecordId} /></Tab.Panel>
            <Tab.Panel><AppointmentsPanel medicalRecordId={medicalRecordId} /></Tab.Panel>
            <Tab.Panel><MedicationsPanel medicalRecordId={medicalRecordId} /></Tab.Panel>
            <Tab.Panel><AllergiesPanel medicalRecordId={medicalRecordId} /></Tab.Panel>
            <Tab.Panel><WeightRecordsPanel medicalRecordId={medicalRecordId} /></Tab.Panel>
          </TabNavigation>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecord;