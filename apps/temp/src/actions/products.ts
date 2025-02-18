import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/product";

export async function getProductById(productId: string) {
  try {
    const response: any = await axios.get(`${BASE_URL}/${productId}`);
    return { product: response.data.data };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { product: [] };
    // throw new Error("Failed to fetch product");
  }
}

export async function getProductsByStore(storeName: string) {
  try {
    console.log(`${BASE_URL}/stores/${storeName}`);
    const response: any = await axios.get(`${BASE_URL}/stores/${storeName}`);
    return { products: response.data.data };
  } catch (error) {
    console.error("Error fetching store products:", error);
    return { products: [] };
  }
}

export async function getProductByCategoryByStore(
  storeId: string,
  categoryName: string
) {
  try {
    console.log(`${BASE_URL}/stores/${storeId}`);
    const response: any = await axios.get(
      `${BASE_URL}/stores/${storeId}/category/${categoryName}`
    );
    return { products: response.data.data };
  } catch (error) {
    console.error("Error fetching store products:", error);
    return { products: [] };
  }
}
