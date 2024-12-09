import { StepIndicator } from "./StepIndicator";
import { renderStep } from "../step_render/render";
import { useFormContext } from "../formContext/FormContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function UserForm() {
  const {
    step,
    nextStep,
    prevStep,
    handleSubmit,
    watch,
    errors,
    register,
    setValue,
    control,
  } = useFormContext();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const Postdata = import.meta.env.VITE_LOG_IN_API_URL;

  // console.log(Postdata);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(Postdata, JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        setTimeout(() => {
          setLoading(false);
          setMessage("User successfully created!");
          setTimeout(() => navigate("/login"), 2000);
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="max-w-lg w-full h-[90vh] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>

        <div className="overflow-y-auto h-[75%] px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStep({ step, register, errors, watch, setValue, control })}

            {loading && (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
              </div>
            )}

            {message && (
              <div className="text-green-500 text-center mt-4">{message}</div>
            )}

            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-between mt-4 mb-5">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="btn btn-outline-danger d-flex align-items-center"
              >
                Previous
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-outline-danger d-flex align-items-center"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-indigo-600 py-2 px-4 rounded-md text-sm font-medium text-white"
                  disabled={loading}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
