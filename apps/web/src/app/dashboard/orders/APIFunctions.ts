import axios from 'axios';
const API_BASE_URL = 'http://localhost:8080/api/v1';
const STORENAME='TechStore' // Temporarily hardcoded
const STOREID='1d3fe66f-50ac-4a02-a94c-20e7681d2f2e';

export const ordersApi = {
    getOrderByStoreId: async () => {
      const response = await axios.get<any>(`${API_BASE_URL}/order/${STOREID}`, {
        withCredentials: true
      });
      return response.data;
    },
  };