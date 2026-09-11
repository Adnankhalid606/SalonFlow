import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEmployeeSchema } from "../validation/employeeSchema";
import { createEmployeeApi } from "../api/EmployeeServices";
import { useState } from "react";

function CreateEmployee() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createEmployeeSchema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const salaryMethod = watch("salary.method");
  async function onSubmit(data) {
    try {
      setLoading(true);
      setError("");
      setResponse(null);
      const response = await createEmployeeApi(data);
      setResponse(response);
      reset();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went Wrong! Please Try again later!",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form
          className="flex flex-col gap-3 w-[80%] md:w-[70%] lg:w-[60%] shadow-2xl border border-gray-400 p-6 rounded-lg "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Create Employee
          </h1>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Employee Name"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label>Phone:</label>
          <input
            type="text"
            placeholder="Enter Employee Phone"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
          )}

          <label>Salary:</label>
          <select
            className="w-full border border-gray-400 rounded-md p-2"
            {...register("salary.method")}
          >
            <option value="">Select Salary Method</option>
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors.salary && (
            <p className="text-red-500">{errors.salary.message}</p>
          )}

          {/* Fixed Condition */}
          {salaryMethod === "fixed" && (
            <>
              <label>Fixed Salary:</label>
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                {...register("salary.fixed", { valueAsNumber: true })}
              />
              <label>Frequency:</label>
              <select {...register("salary.frequency")}>
                <option value="">Select Frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </>
          )}

          {/* Percetage Condition  */}
          {salaryMethod === "percentage" && (
            <>
              <label>Percentage:</label>
              <input
                type="number"
                placeholder="Enter Percentage"
                {...register("salary.percentage", { valueAsNumber: true })}
              />
            </>
          )}

          {/* Hybrid Condition  */}
          {salaryMethod === "hybrid" && (
            <>
              <label>Fixed Salary:</label>
              <input
                type="number"
                placeholder="Enter Fixed Salary"
                {...register("salary.fixed", { valueAsNumber: true })}
              />
              <label>Percentage:</label>
              <input
                type="number"
                placeholder="Enter Percentage"
                {...register("salary.percentage", { valueAsNumber: true })}
              />
              <label>Select Frequency</label>
              <select {...register("salary.frequency")}>
                <option value="">Select Frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </>
          )}
          {errors?.salary?.fixed && (
            <p className="text-red-500">{errors?.salary?.fixed?.message}</p>
          )}
          {errors?.salary?.percentage && (
            <p className="text-red-500">
              {errors?.salary?.percentage?.message}
            </p>
          )}
          {errors?.salary?.frequency && (
            <p className="text-red-500">{errors?.salary?.frequency?.message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Creating..." : "Create Employee"}
          </button>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}
          {response?.data?.status && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <p>{response?.data?.message}</p>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default CreateEmployee;
