import { create } from 'zustand';
import { getPatients } from '../hooks/patients/getPatients';
import { getServices } from '../hooks/services/getServices';
import { getProducts } from '../hooks/products/getProducts';
import { getRecords } from '../hooks/records/getRecords'; // Assuming you have a getRecords function

export const useGlobalStore = create((set) => ({
  patients: [],
  services: [],
  serviceCategories: [],
  products: [],
  productCategories: [],
  productProviders: [],
  records: [],
  orders: [],
  isLoading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setPatients: (patients) => set({ patients }),

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const patients = await getPatients();
      set({ patients });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchServices: async () => {
    set({ isLoading: true, error: null });
    try {
      const services = await getServices();
      set({ services });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await getProducts();
      set({ products });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchRecords: async () => {
    set({ isLoading: true, error: null });
    try {
      const records = await getRecords();
      set({ records });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProdCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const productCategories = await getProductCategories();
      set({ productCategories });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchProdProviders: async () => {
    set({ isLoading: true, error: null });
    try {
      const productProviders = await getProductProviders();
      set({ productProviders });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchServiceCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const serviceCategories = await getServiceCategories();
      set({ serviceCategories });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  }
}));
