import api from './axios.js'
export const getAllEmployeesApi = async (params) => {
    try {
     const response = await  api.get('/employee',{
        params:params
     })
    console.log('params: ', params);
    
     return response;
    } catch (error) {
        return error;
    }
}
export const getEmployeeByIdApi = async(id)=>{
    try{
        const response = await api.get(`/employee/${id}`)
        return response
    }catch(error){
        return error;
    }
}
export const createEmployeeApi = async (data)=>{
    try{
        const response = await api.post('/employee/create', data)
        return response
    }catch(error){
        return error;
    }
}

export const updateEmployeeApi = async(id, data)=>{
    try{
        const response = await api.put(`/employee/update/${id}`, data)
        return response
    }catch(error){
        return error;
    }
}

export const deleteEmployeeApi = async(id)=>{
    try{
        const response = await api.delete(`/employee/delete/${id}`)
        return response
    }catch(error){
        return error;
    }
}