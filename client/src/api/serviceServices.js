import api from "./axios";

export const getAllServicesApi = async () => {
  try {
    const response = await api.get("/services");
    return response;
  } catch (err) {
    return err;
  }
};

export const getServiceByIdApi = async (id)=>{
    try{
        const response = await api.get(`/services/${id}`);
        return response;
    }
    catch(err){
        return err;
    }
}

export const createServiceApi = async (data)=>{
    try{
        const response = await api.post("/services/create", data);
        return response;
    }
    catch(err){
        return err;
    }
}

export const updateServiceApi = async (id, data)=>{
    try{
        const response = await api.put(`/services/update/${id}`, data);
        return response;
    }
    catch(err){
        return err;
    }
}

export const deleteServiceApi = async (id)=>{
    try{
        const response = await api.delete(`/services/delete/${id}`);
        return response;
    }
    catch(err){
        return err;
    }
}