import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getEmployeeByIdApi, updateEmployeeApi } from "../api/EmployeeServices";
import { createEmployeeSchema } from "../validation/employeeSchema";

function UpdateEmployee() {
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(createEmployeeSchema),
  });

  const salaryMethod = watch("salary.method");

  useEffect(() => {
    async function getEmployee() {
      try {
        setError(null);
        setLoading(true);

        const response = await getEmployeeByIdApi(id);

        const employeeData = response.data.data;

        reset(employeeData);
       
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch employee");
      } finally {
        setLoading(false);
      }
    }

    getEmployee();
  }, [id, reset]);

  async function onSubmit(data) {
    try{
      const response = await updateEmployeeApi(id, data);
      alert(response?.data?.message)

    }
    catch(err){
      setError(err?.response?.data?.message || "Failed to update employee");
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="text-3xl text-center mb-6">Update Employee</h1>

      <form className="max-w-2xl mx-auto p-8" onSubmit={handleSubmit(onSubmit)}>
        {/* NAME */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name:
        </label>

        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
          {...register("name")}
        />

        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <br />

        {/* PHONE */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone:
        </label>

        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
          {...register("phone")}
        />

        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <br />

        {/* SALARY METHOD */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Salary Method:
        </label>

        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          {...register("salary.method")}
        >
          <option value="fixed">Fixed</option>
          <option value="percentage">Percentage</option>
          <option value="hybrid">Hybrid</option>
        </select>

        {errors.salary?.method && (
          <p className="text-red-500">{errors.salary.method.message}</p>
        )}

        <br />

        {/* FIXED SALARY */}
        {salaryMethod === "fixed" && (
          <>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fixed Salary:
            </label>

            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="number"
              {...register("salary.fixed", {
                valueAsNumber: true,
              })}
            />

            {errors.salary?.fixed && (
              <p className="text-red-500">{errors.salary.fixed.message}</p>
            )}

            <br />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Frequency:
            </label>

            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              {...register("salary.frequency")}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            {errors.salary?.frequency && (
              <p className="text-red-500">{errors.salary.frequency.message}</p>
            )}

            <br />
          </>
        )}

        {/* PERCENTAGE */}
        {salaryMethod === "percentage" && (
          <>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Percentage:
            </label>

            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="number"
              {...register("salary.percentage", {
                valueAsNumber: true,
              })}
            />

            {errors.salary?.percentage && (
              <p className="text-red-500">{errors.salary.percentage.message}</p>
            )}

            <br />
          </>
        )}

        {/* HYBRID */}
        {salaryMethod === "hybrid" && (
          <>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fixed Salary:
            </label>

            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="number"
              {...register("salary.fixed", {
                valueAsNumber: true,
              })}
            />

            {errors.salary?.fixed && (
              <p className="text-red-500">{errors.salary.fixed.message}</p>
            )}

            <br />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Percentage:
            </label>

            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              type="number"
              {...register("salary.percentage", {
                valueAsNumber: true,
              })}
            />

            {errors.salary?.percentage && (
              <p className="text-red-500">{errors.salary.percentage.message}</p>
            )}

            <br />

            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Frequency:
            </label>

            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              {...register("salary.frequency")}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            {errors.salary?.frequency && (
              <p className="text-red-500">{errors.salary.frequency.message}</p>
            )}

            <br />
          </>
        )}

        {/* IS ACTIVE */}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Is Active:
        </label>

        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          {...register("isActive", {
            setValueAs: (value) => value === "true",
          })}
        >
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>

        {errors.isActive && (
          <p className="text-red-500">{errors.isActive.message}</p>
        )}

        <br />

        {/* Error */}
        {error && <div className="w-full bg-red-500 text-center">{error}</div>}

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Update Employee
        </button>
      </form>
    </>
  );
}

export default UpdateEmployee;
