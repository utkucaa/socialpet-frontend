import React, { useState } from 'react';
import Step1 from './AdoptionSteps/Step1';
import Step2 from './AdoptionSteps/Step2';
import Step3 from './AdoptionSteps/Step3';
import Step4 from './AdoptionSteps/Step4';
import Sidebar from './Sidebar';
import './CreatedPage.css';

const CreatedPage = () => {
const [currentStep, setCurrentStep] = useState(1);
const [adoptionData, setAdoptionData] = useState({});

const handleNext = (data) => {
// Step1'den gelen veriyi adoptionData'ya ekle
if (currentStep === 1) {
setAdoptionData({ ...adoptionData, ...data });
}
setCurrentStep(currentStep + 1);
};

const handleDataChange = (newData) => {
setAdoptionData({ ...adoptionData, ...newData });
};

return (
<div className="create-ad-container">
<Sidebar />
<div className="step-content">
<h1 className="create-ad-title">Sahiplendirme İlanı Ver</h1>
<div className="step">
{currentStep === 1 && <Step1 onNext={handleNext} />}
{currentStep === 2 && (
<Step2
onNext={handleNext}
onDataChange={handleDataChange}
adoptionData={adoptionData}
/>
)}
{currentStep === 3 && (
<Step3
onNext={handleNext}
onAdDataChange={handleDataChange}
adoptionData={adoptionData}
/>
)}
{currentStep === 4 && <Step4 adoptionData={adoptionData} />}
</div>
</div>
</div>
);
};

export default CreatedPage;