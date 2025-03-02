"use client";
import useSWR from "swr";
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/product";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export function useProduct(productId: string) {
  const { data, error, isLoading } = useSWR(
    productId ? `${BASE_URL}/${productId}` : null,
    fetcher
  );

  return {
    product: data,
    isLoading,
    isError: error,
  };
}

export function useProductsByStore(storeId: string) {
  const { data, error, isLoading } = useSWR(
    storeId ? `${BASE_URL}/stores/${storeId}` : null,
    fetcher
  );

  return {
    products: data || [],
    isLoading,
    isError: error,
  };
}
