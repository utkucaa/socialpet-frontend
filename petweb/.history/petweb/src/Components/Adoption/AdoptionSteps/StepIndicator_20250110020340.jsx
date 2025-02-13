import React from 'react';
import './StepIndicator.css'; 

const StepIndicator = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`step ${step.active ? 'active' : ''}`}
          onClick={() => onStepClick(step.number)} 
        >
          {step.text}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;