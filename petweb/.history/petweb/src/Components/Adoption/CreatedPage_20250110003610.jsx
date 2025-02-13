import React, { useState } from 'react';
import Step1 from './AdoptionSteps/Step1';
import Step2 from './AdoptionSteps/Step2';
import Step3 from './AdoptionSteps/Step3';
import Step4 from './AdoptionSteps/Step4';
import Sidebar from './Sidebar';
import './CreatedPage.css';

const CreatedPage = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const handleStepClick = (step) => {
        setCurrentStep(step); // Adım başlığına tıklanarak geçilen adım
    };

    return (
        <div className="create-ad-container">
            <Sidebar />
            <div className="step-content">
            <h1 className="create-ad-title">Sahiplendirme İlanı Ver</h1>
                <div className="step">
                     <h3 onClick={() => handleStepClick(1)} className={currentStep === 1 ? 'active' : ''}>Adım 1</h3>
    <h3 onClick={() => handleStepClick(2)} className={currentStep === 2 ? 'active' : ''}>Adım 2</h3>
    <h3 onClick={() => handleStepClick(3)} className={currentStep === 3 ? 'active' : ''}>Adım 3</h3>
    <h3 onClick={() => handleStepClick(4)} className={currentStep === 4 ? 'active' : ''}>Adım 4</h3>
                </div>
                
            </div>
        </div>
    );
};

export default CreatedPage;
