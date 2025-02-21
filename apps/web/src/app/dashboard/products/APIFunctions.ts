import axios from 'axios';
import { Product } from './types';
const API_BASE_URL = 'http://localhost:8080/api/v1';
const CATEGORYNAME = 'Electronics';   // Temporary hardcoded
const STORENAME = 'TechStore'   // Temporary hardcoded

export const productApi = {
    getProductByStore: async (storeId : string) => {
      const response = await axios.get<any>(`${API_BASE_URL}/product/stores/${STORENAME}`, {
        withCredentials: true
      });
      return response.data;
    },
  
    createProduct: async (storeId : string,data: Product) => {
      const response = await axios.post<any>(`${API_BASE_URL}/product/${storeId}`, data, {
        withCredentials: true
      });
      return response.data;
    },
  
    update: async (id: string, data: Product) => {
      const response = await axios.put<any>(`${API_BASE_URL}/product/${id}`, data, {
        withCredentials: true
      });
      return response.data;
    },
  
    delete: async (id: number) => {
      const response = await axios.delete<any>(`${API_BASE_URL}/product/${id}`, {
        withCredentials: true
      });
      return response.data;
    }
  };