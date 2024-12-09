import React from "react";

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-between mb-4">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-full ${
            currentStep === index + 1 ? "bg-blue-600" : "bg-gray-400"
          }`}
        ></div>
      ))}
    </div>
  );
}
