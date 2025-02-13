import React from 'react';
import Navbar from '../components/Navbar';
import CategoryBar from '../components/CategoryBar';
import LostIntro from '../components/LostIntro';
import CallToAction from '../components/CallToAction';
import LostItemsList from '../components/LostItemsList';
import CategorySections from '../components/CategorySections';

const LostPage = () => {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <LostIntro />
      <CallToAction />
      <LostItemsList />
      <CategorySections />
    </>
  );
};

export default LostPage;