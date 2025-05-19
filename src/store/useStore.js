import { create } from "zustand";
import { apiClient } from "../services/config";

const useStore = create((set) => ({
  products: [],
  categories: [],
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get("/products");
      set({ products: response.data, loading: false });
    } catch (err) {
      console.error("Fetch products error:", err.response?.data || err.message);
      set({ error: err.message || "Failed to fetch products", loading: false });
    }
  },

  fetchCategories: async () => {
    set({ error: null });
    try {
      const response = await apiClient.get("/categories");
      set({ categories: response.data });
    } catch (err) {
      console.error(
        "Fetch categories error:",
        err.response?.data || err.message
      );
      set({ error: err.message || "Failed to fetch categories" });
    }
  },

  addProduct: async (product, Swal) => {
    set({ loading: true, error: null });
    try {
      console.log("Adding product with payload:", product);
      const response = await apiClient.post("/products", product);
      set((state) => ({
        products: [...state.products, response.data],
        loading: false,
      }));
      if (Swal && Swal.fire) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.log("Success: Product added successfully");
      }
      return true;
    } catch (err) {
      console.error("Add product error:", err.response?.data || err.message);
      set({ error: err.message || "Failed to add product", loading: false });
      if (Swal && Swal.fire) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message ||
            err.message ||
            "Failed to add product",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.error("Error: Failed to add product");
      }
      return false;
    }
  },

  updateProduct: async (id, product, Swal) => {
    set({ loading: true, error: null });
    try {
      console.log("Updating product with ID:", id, "Payload:", product);
      const response = await apiClient.put(`/products/${id}`, product);
      set((state) => ({
        products: state.products.map((p) => (p.id === id ? response.data : p)),
        loading: false,
      }));
      if (Swal && Swal.fire) {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product updated successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.log("Success: Product updated successfully");
      }
      return true;
    } catch (err) {
      console.error("Update product error:", err.response?.data || err.message);
      set({ error: err.message || "Failed to update product", loading: false });
      if (Swal && Swal.fire) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message ||
            err.message ||
            "Failed to update product",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        console.error("Error: Failed to update product");
      }
      return false;
    }
  },

  deleteProduct: async (id, Swal) => {
    set({ loading: true, error: null });
    try {
      console.log("Deleting product with ID:", id);
      await apiClient.delete(`/products/${id}`);

      set((state) => {
        const newFavorites = state.favorites.filter((favId) => favId !== id);
        try {
          localStorage.setItem("favorites", JSON.stringify(newFavorites));
          console.log("localStorage updated with favorites:", newFavorites);
        } catch (storageErr) {
          console.error("Failed to update localStorage:", storageErr);
        }
        return {
          products: state.products.filter((p) => p.id !== id),
          favorites: newFavorites,
          loading: false,
        };
      });

      
      if (Swal && typeof Swal.fire === "function") {
        await Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product deleted successfully",
          timer: 2000,
          showConfirmButton: true,
        });
      } else {
        console.log(
          "Success: Product deleted successfully (Swal not available)"
        );
      }
      return true;
    } catch (err) {
      console.error(
        "Delete product error:",
        err.response?.data || err.message,
        err
      );
      set({ error: err.message || "Failed to delete product", loading: false });
      if (Swal && typeof Swal.fire === "function") {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text:
            err.response?.data?.message ||
            err.message ||
            "Failed to delete product",
          timer: 2000,
          showConfirmButton: true,
        });
      } else {
        console.error("Error: Failed to delete product (Swal not available)");
      }
      return false;
    }
  },

  toggleFavorite: (id) => {
    set((state) => {
      const newFavorites = state.favorites.includes(id)
        ? state.favorites.filter((favId) => favId !== id)
        : [...state.favorites, id];
      try {
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
      } catch (err) {
        console.error("Failed to update localStorage:", err);
      }
      return { favorites: newFavorites };
    });
  },
}));

export default useStore;
