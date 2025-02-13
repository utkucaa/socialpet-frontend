import React from 'react';
import CategoryBar from './CategoryBar'; // Lost klasöründeki CategoryBar.jsx
import LostIntro from './LostIntro'; // Lost klasöründeki LostIntro.jsx
import CallToAction from './CallToAction'; // Lost klasöründeki CallToAction.jsx
import LostItemsList from './LostItemsList/LostItemsList'; // Lost klasöründeki LostItemsList.jsx
import CategorySections from './CategorySections/CategorySections';

const LostPage = () => {
  return (
    <>
      <CategoryBar />
      <LostIntro />
      <CallToAction />
      <LostItemsList />
      <CategorySections />
    </>
  );
};

export default LostPage;