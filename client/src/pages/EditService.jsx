import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createServiceSchema } from "../validation/serviceSchema";
import { useEffect, useState } from "react";
import { getServiceByIdApi, updateServiceApi } from "../api/serviceServices";
import { toast, ToastContainer } from "react-toastify";

function UpdateService() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {register, handleSubmit, formState: {errors}, reset} = useForm(
    {resolver : zodResolver(createServiceSchema)}
  )
  const navigate = useNavigate();
  useEffect(()=>{
    async function fetchData(id) {
        try{
          setLoading(true);
          setError(null);
          const response = await getServiceByIdApi(id);
          const serviceData = response.data.data;
          reset(serviceData);
        }
        catch(err){
          setError(err?.response?.data?.messsage)
        }
        finally{
          setLoading(false);
        }
    }

    fetchData(id);
  }, [])
  async function onSubmit(data){
    try{
      const response = await updateServiceApi(id, data)
      if(response.data.status){
        toast.success(response.data.message)
      }
    }
    catch(err){
      toast.error(err?.response?.data?.message)
    }
    finally{
      setLoading(false)
    }
  }
  if(loading){
    return <h1>Loading...</h1>
  }
  if(error){
    return <h1>{error}</h1>
  }
  return (
    <>
    <div className="flex justify-between items-center">
      <h1 className="text-3xl text-center">Edit Service</h1>
      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer" onClick={()=> navigate('/services')}>Back</button>
      </div>
      <ToastContainer/>

      <div className="flex justify-center items-center mt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[40%] border border-gray-400 shadow-2xl p-6 rounded-lg flex flex-col gap-3 justify-center" >
            <label className="text-lg">Name:</label>
            <input className="w-full border border-gray-400 rounded-md p-2" type="text" placeholder="Enter Service Name" {...register("name")} />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            <label className="text-lg">Price:</label>
            <input className="w-full border border-gray-400 rounded-md p-2" type="number" placeholder="Enter Service Price" {...register("price", {valueAsNumber : true})} />
            {errors.price && <span className="text-red-500">{errors.price.message}</span>}
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Update</button>
            {
              error && <p className="text-red-500">{error}</p>
            }
        </form>
      </div>
    </>
  );
}
export default UpdateService;
