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

export const createEmployeeApi = async (data)=>{
    try{
        const response = await api.post('/employee/create', data)
        return response
    }catch(error){
        return error;
    }
}