import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/category";

// Fetch categories by storeName
export const fetchCategories = async (storeName: string) => {
  try {
    const response: any = await axios.get(`${BASE_URL}/${storeName}`);
    console.log(response);
    return { category: response.data.data };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { category: [] };
  }
};
