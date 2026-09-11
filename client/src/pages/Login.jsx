import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authSchema";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const {login} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  }); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function onSubmit(data) {
    try {
      setLoading(true);
      setError("");
      const response =  await login(data);
      if(response.data.status == true){
        navigate('/'); 
      }
      console.log(response.data);

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className="flex w-full h-screen justify-center items-center">
        <div className="border rounded-2xl w-2/6 p-10 flex flex-col shadow-2xl gap-10">
          <h1 className="text-4xl font-bold text-center">Login Form</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
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
              <p className="mt-5 font-bold">Don't Have an Account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700">Register</Link></p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="self-center cursor-pointer mt-10 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
