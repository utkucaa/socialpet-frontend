import React, { useState } from 'react';
import Step1 from './AdoptionSteps/Step1';
import Step2 from './AdoptionSteps/Step2';
import Step3 from './AdoptionSteps/Step3';
import Step4 from './AdoptionSteps/Step4';
import Sidebar from './Sidebar';
import './CreatedPage.css';

const CreatedPage = () => {
    const [currentStep, setCurrentStep] = useState(1); // Aktif adımı tutuyoruz

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1); // Devam et butonuna tıklandığında bir sonraki adıma geç
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
                <div className="step-navigation">
                    {/* Adım başlıklarını burada render ediyoruz */}
                    {[1, 2, 3, 4].map((step) => (
                        <button
                            key={step}
                            onClick={() => handleStepClick(step)} // Başlığa tıklanınca ilgili adıma geç
                            className={`step-button ${currentStep === step ? 'active' : ''}`} // Aktif adıma stil ekliyoruz
                        >
                            Adım {step}
                        </button>
                    ))}
                </div>
                <div className="step">
                    {/* Aktif adıma göre içerik render ediliyor */}
                    {currentStep === 1 && <Step1 onNext={handleNext} />}
                    {currentStep === 2 && <Step2 onNext={handleNext} />}
                    {currentStep === 3 && <Step3 onNext={handleNext} />}
                    {currentStep === 4 && <Step4 />}
                </div>
                {/* Eğer 4. adımda değilsen, devam et butonunu göster */}
                {currentStep < 4 && (
                    <button onClick={handleNext} className="next-button">
                        Devam Et
                    </button>
                )}
            </div>
        </div>
    );
};

export default CreatedPage;
