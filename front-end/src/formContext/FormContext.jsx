import React, { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { INITIAL_USER_DATA, isStepValid } from "../validation/validationRules";

//user context 
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      mode: "onChange",
      defaultValues: INITIAL_USER_DATA,
    });

  const nextStep = () => {
    if (step < 3 && isStepValid(watch, step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const contextValue = {
    step,
    nextStep,
    prevStep,
    register,
    handleSubmit,
    watch,
    errors: formState.errors,
    setValue,
    control,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
