
import { PlusCircle, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { useFormContext } from "../../formContext/FormContext";

const EDUCATION_TYPES = ["10th", "12th", "Graduation", "PostGraduation"];
const YEARS = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

export function EducationStep() {
  const { control, register, errors } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const addEducation = () => {
    append({
      type: "10th",
      passingYear: "",
      schoolCollege: "",
      percentage: "",
    });
  };

  return (
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="p-4 border rounded-lg bg-gray-50 relative"
        >
          <div className="absolute top-4 right-4">
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Education Type
            </label>
            <select
              {...register(`education.${index}.type`, { required: true })}
              defaultValue={field.type}
              className="form-input w-full"
            >
              {EDUCATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              School/College Name
            </label>
            <input
              type="text"
              {...register(`education.${index}.schoolCollege`, {
                required: "School/College name is required",
              })}
              defaultValue={field.schoolCollege}
              className="form-input w-full"
            />
            {errors.education?.[index]?.schoolCollege && (
              <p className="text-red-500 text-sm mt-1">
                {errors.education[index].schoolCollege.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Passing Year
            </label>
            <select
              {...register(`education.${index}.passingYear`, {
                required: true,
              })}
              defaultValue={field.passingYear}
              className="form-input w-full"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Percentage
            </label>
            <input
              type="number"
              step="0.01"
              {...register(`education.${index}.percentage`, {
                required: "Percentage is required",
                min: 0,
                max: 100,
              })}
              defaultValue={field.percentage}
              className="form-input w-full"
            />
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
        >
{/*           <PlusCircle className="h-5 w-5 mr-2" /> */}
          Add Education
        </button>
      </div>
    </div>
  );
}
