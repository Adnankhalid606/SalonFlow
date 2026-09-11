import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../validation/authSchema";
import api from "../api/axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    try {
      setLoading(true);
      const response = await api.post("/user/register", data);
      console.log(response.data.data);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went Wrong! Please Try again later!",
      );
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="border rounded-2xl w-2/6 p-10 flex flex-col shadow-2xl gap-10">
          <h1 className="text-4xl font-bold text-center">Register User</h1>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="block w-full rounded-md p-2.5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("name")}
            />
            {errors.name && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errors.name?.message}</p>
              </div>
            )}
            <label>Email:</label>
            <input
              type="email"
              placeholder="Type your Email"
              className="block w-full rounded-md p-2.5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("email")}
            />
            {errors.email && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errors.email?.message}</p>
              </div>
            )}

            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              className="block w-full rounded-md p-2.5 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register("password")}
            />
            {errors.password && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errors.password?.message}</p>
              </div>
            )}

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}
            <div className="text-center">
              <p className="mt-5 font-bold">Already Have an Account? <Link to="/login" className="text-indigo-600 hover:text-indigo-700">Login</Link></p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="self-center cursor-pointer mt-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;

{
  /* <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <p>{errors.email?.message}</p>
              </div> */
}
