import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoryBar from './CategoryBar'; // Lost klasöründeki CategoryBar.jsx
import LostIntro from './LostIntro'; // Lost klasöründeki LostIntro.jsx
import CallToAction from './CallToAction'; // Lost klasöründeki CallToAction.jsx
import LostItemsList from './LostItemList'; // Lost klasöründeki LostItemsList.jsx
import LostPetDetail from './LostPetDetail';
import CreateListingPage from './CreateListingPage';

const LostPage: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <CategoryBar />
            <LostIntro />
            <CallToAction />
            <LostItemsList />
          </>
        }
      />
      <Route path="/create" element={<CreateListingPage />} />
      <Route path="/:id" element={<LostPetDetail />} />
    </Routes>
  );
};

export default LostPage;