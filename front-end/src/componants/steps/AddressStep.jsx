import React from "react";
import { useFormContext } from "../../formContext/FormContext";

export function AddressStep() {
  const { register, errors } = useFormContext();

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="address1" className="block text-lg font-semibold mb-1">
          Address Line 1
        </label>
        <textarea
          {...register("address1", {
            required: "Address Line 1 is required",
            minLength: {
              value: 3,
              message: "Address Line 1 must be at least 3 characters",
            },
          })}
          id="address1"
          className="form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.address1 && (
          <p className="text-red-500 text-sm mt-1">{errors.address1.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="address2" className="block text-lg font-semibold mb-1">
          Address Line 2
        </label>
        <textarea
          {...register("address2", {
            required: "Address Line 2 is required",
            minLength: {
              value: 3,
              message: "Address Line 2 must be at least 3 characters",
            },
          })}
          id="address2"
          className="form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.address2 && (
          <p className="text-red-500 text-sm mt-1">{errors.address2.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="city" className="block text-lg font-semibold mb-1">
          City
        </label>
        <input
          {...register("city", { required: "City is required" })}
          id="city"
          className="form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="state" className="block text-lg font-semibold mb-1">
          State
        </label>
        <input
          {...register("state", { required: "State is required" })}
          id="state"
          className="form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="zipcode" className="block text-lg font-semibold mb-1">
          Zipcode
        </label>
        <input
          {...register("zipcode", {
            required: "Zipcode is required",
            pattern: {
              value: /^[0-9]{5}$/,
              message: "Zipcode must be a 5-digit number",
            },
          })}
          id="zipcode"
          className="form-input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors?.zipcode && (
          <p className="text-red-500 text-sm mt-1">{errors.zipcode.message}</p>
        )}
      </div>
    </div>
  );
}
