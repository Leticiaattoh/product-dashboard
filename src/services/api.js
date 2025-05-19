import { apiClient } from "./config";

export const apiGetProducts = async () => apiClient.get("/products");
export const apiAddProduct = async (payload) =>
  apiClient.post("/products", payload);
export const apiUpdateProduct = async (id, payload) =>
  apiClient.put(`/products/${id}`, payload);
export const apiDeleteProduct = async (id) =>
  apiClient.delete(`/products/${id}`);
export const apiGetCategories = async () => apiClient.get("/categories");
