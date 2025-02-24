import React from 'react';
import './StepIndicator.css';

interface Step {
  number: number;
  text: string;
  active: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
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