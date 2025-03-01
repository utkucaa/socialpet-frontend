import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdoptionPage from '../components/Adoption/AdoptionPage';
import AdDetail from '../components/Adoption/AdDetail';
import CreatedPage from '../components/Adoption/CreatedPage';
import { PetList } from '../components/Pets';
import MedicalRecord from '../components/MedicalRecord/MedicalRecord';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdoptionPage />} />
      <Route path="/adoption/:id" element={<AdDetail />} />
      <Route path="/create-ad" element={<CreatedPage />} />
      <Route path="/pets" element={<PetList />} />
      <Route path="/medical-record/:petId" element={<MedicalRecord />} />
    </Routes>
  );
};

export default AppRoutes; 