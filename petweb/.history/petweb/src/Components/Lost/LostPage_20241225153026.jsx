import React from 'react';
import CategoryBar from './CategoryBar'; // Lost klasöründeki CategoryBar.jsx
import LostIntro from './LostIntro'; // Lost klasöründeki LostIntro.jsx
import CallToAction from './CallToAction'; // Lost klasöründeki CallToAction.jsx
import LostItemsList from './LostItemList'; // Lost klasöründeki LostItemsList.jsx
import LostItemCard from './LostItemCard';

const LostPage = () => {
  return (
    <>
      <CategoryBar />
      <LostIntro />
      <CallToAction />
      <LostItemsList />
    </>
  );
};

export default LostPage;