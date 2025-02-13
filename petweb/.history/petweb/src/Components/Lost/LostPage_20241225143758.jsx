import React from 'react';
import CategoryBar from './CategoryBar'; // Lost klasöründeki CategoryBar.jsx
import LostIntro from './LostIntro'; // Lost klasöründeki LostIntro.jsx
import CallToAction from './CallToAction'; // Lost klasöründeki CallToAction.jsx
import LostItemsList from './LostItemList'; // Lost klasöründeki LostItemsList.jsx
import CategorySections from './CategorySection';
import LostItemsCard from './LostItemCard';

const LostPage = () => {
  return (
    <>
      <CategoryBar />
      <LostIntro />
      <LostItemCard/>
      <CallToAction />
      <LostItemsList />
      <CategorySections />
    </>
  );
};

export default LostPage;