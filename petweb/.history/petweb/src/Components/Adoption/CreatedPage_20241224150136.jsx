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
    

    return (
        <div className="create-ad-container">
            <Sidebar />
            <div className="step-content">
            <h1 className="create-ad-title">Sahiplendirme İlanı Ver</h1>
                <div className="step">
                    {currentStep === 1 && <Step1 onNext={handleNext} />}
                    {currentStep === 2 && <Step2 onNext={handleNext} />}
                    {currentStep === 3 && <Step3 onNext={handleNext} />}
                    {currentStep === 4 && <Step4 />}
                </div>
                
            </div>
        </div>
    );
};

export default CreatedPage;
