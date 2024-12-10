import React from "react";

export function StepIndicator({ currentStep, totalSteps }) {
  return (
    <div className="flex justify-between mb-4">
      {[...Array(totalSteps)].map((_, index) => (
         <div
          key={index}
          className={`w-6 h-6 rounded-full ${
            currentStep === index + 1 ? "bg-blue-600 text-white" : "bg-gray-400"
          } flex justify-center items-center text-black-700`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
}
