import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createServiceSchema } from "../validation/serviceSchema";
import { createServiceApi } from "../api/serviceServices";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CreateService() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createServiceSchema) });

  async function onSubmit(data) {
    try {
      setLoading(true);
      const response = await createServiceApi(data);
      if (response.data.status) {
        toast.success("Created Successfully", {
          position: "bottom-right",
          autoClose: 2500,
        });
      }

      reset();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create service", {
        position: "bottom-right",
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <ToastContainer />

      {/* Back Link */}
      <Link
        to="/services"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors mb-6"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Services
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Card Header */}
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Add New Service
              </h1>
              <p className="text-sm text-gray-500">
                Define the service name and price for your salon menu.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 sm:p-8 space-y-6"
        >
          {/* Service Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Haircut & Styling, Beard Trim..."
                {...register("name")}
                className={`w-full px-4 py-2.5 bg-gray-50/50 border rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                }`}
              />
            </div>
            {errors.name ? (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.name.message}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-400">
                Must be between 3 and 20 characters
              </p>
            )}
          </div>

          {/* Service Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 font-semibold text-sm">
                ₨
              </div>
              <input
                type="number"
                step="1"
                placeholder="0"
                {...register("price", { valueAsNumber: true })}
                className={`w-full pl-8 pr-4 py-2.5 bg-gray-50/50 border rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:bg-white transition-all ${
                  errors.price
                    ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                }`}
              />
            </div>
            {errors.price ? (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1 font-medium">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.price.message}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-gray-400">
                Enter a positive integer amount
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/services")}
              className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-1 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Create Service
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateService;
