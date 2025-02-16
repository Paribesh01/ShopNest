import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api/v1';

export const categoryApi = {
    getAll: async () => {
      const response = await axios.get<any>(`${API_BASE_URL}/category`, {
        withCredentials: true
      });
      console.log(response.data);
      return response.data;
    },
  
    create: async (storeId : string,data: {name : string}) => {
      const response = await axios.post<any>(`${API_BASE_URL}/category/${storeId}`, data, {
        withCredentials: true
      });
      return response.data;
    },
  
    update: async (id: string, data: {name : string}) => {
      const response = await axios.put<any>(`${API_BASE_URL}/category/${id}`, data, {
        withCredentials: true
      });
      return response.data;
    },
  
    delete: async (id: number) => {
      const response = await axios.delete<any>(`${API_BASE_URL}/category/${id}`, {
        withCredentials: true
      });
      return response.data;
    }
  };