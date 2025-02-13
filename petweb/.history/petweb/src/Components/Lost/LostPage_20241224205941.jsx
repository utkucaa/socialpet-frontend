import React from 'react';
import Navbar from '../components/Navbar';
import CategoryBar from './Components/Lost/CategoryBar';
import LostIntro from './Components/Lost/LostIntro';
import CallToAction from './Components/Lost/CallToAction';
import LostItemsList from './Components/Lost/LostItemsList';
import CategorySections from './Components/Lost/CategorySections';

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