import React from 'react';
import './StepIndicator.css'; // CSS dosyasını da eklemelisiniz

const StepIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`step ${step.active ? 'active' : ''}`}
          onClick={() => onStepClick(step.number)} // Adım başlığına tıklandığında geçiş
        >
          {step.text}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;