// @ts-nocheck
import React from 'react';
import { Tab } from '@headlessui/react';
import { PetHeader } from './PetHeader';
import { TabNavigation } from './TabNavigation';
import { VaccinationsPanel } from './VaccinationsPanel';
import { TreatmentsPanel } from './TreatmentsPanel';
import { AppointmentsPanel } from './AppointmentsPanel';
import { MedicationsPanel } from './MedicationsPanel';
import { AllergiesPanel } from './AllergiesPanel';
import { WeightRecordsPanel } from './WeightRecordsPanel';
import { Pet } from './types';

const samplePet: Pet = {
  id: '1',
  name: 'Max',
  type: 'dog',
  age: 5,
  imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
  breed: 'Golden Retriever',
};

function MedicalRecord() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PetHeader pet={samplePet} />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <TabNavigation>
            <Tab.Panel><VaccinationsPanel /></Tab.Panel>
            <Tab.Panel><TreatmentsPanel /></Tab.Panel>
            <Tab.Panel><AppointmentsPanel /></Tab.Panel>
            <Tab.Panel><MedicationsPanel /></Tab.Panel>
            <Tab.Panel><AllergiesPanel /></Tab.Panel>
            <Tab.Panel><WeightRecordsPanel /></Tab.Panel>
          </TabNavigation>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecord;