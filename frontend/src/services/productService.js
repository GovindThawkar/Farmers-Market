import api from "./api";

export const productService = {
  getAllProducts: async () => {
    const response = await api.get("/products/public");
    return response.data;
  },

  getProductById: async (id) => {
    const response = await api.get(`/products/public/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category) => {
    const response = await api.get(`/products/public/category/${category}`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get(`/products/public/search?q=${query}`);
    return response.data;
  },

  getOrganicProducts: async () => {
    const response = await api.get("/products/public/organic");
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post("/products", productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  getProductsByFarmer: async (farmerId) => {
    const response = await api.get(`/products/farmer/${farmerId}`);
    return response.data;
  },
};
