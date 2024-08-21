import { create } from 'zustand'
import { getPatients } from '../hooks/patients/getPatients'
import { getServices } from '../hooks/services/getServices'
import { getProducts } from '../hooks/products/getProducts'
import { getRecords } from '../hooks/records/getRecords' // Assuming you have a getRecords function
import { getProductCategories } from 'src/hooks/products/categories/getProductCategories'
import { getProductProviders } from 'src/hooks/products/providers/getProductProviders'
import { getServiceCategories } from 'src/hooks/services/categories/getServiceCategories'
import { getServiceVariations } from 'src/hooks/services/variations/getServiceVariations'

export const useGlobalStore = create(set => ({
  patients: [],
  services: [],
  serviceCategories: [],
  serviceVariations: [],
  products: [],
  productCategories: [],
  productProviders: [],
  records: [],
  orders: [],
  isLoading: false,
  error: null,
  setRecords: records => set({ records }),
  
  setProducts: products => set({ products }),
  setPatients: patients => set({ patients }),
  setServices: services => set({ services }),
  setServiceVariations: serviceVariations => set({ serviceVariations }),
  setProductCategories: productCategories => set({ productCategories }),
  setProductProviders: productProviders => set({ productProviders }),
  setServiceCategories: serviceCategories => set({ serviceCategories }),
  fetchPatients: async () => {
    set({ isLoading: true, error: null })
    try {
      const patients = await getPatients()
      set({ patients })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchServices: async () => {
    set({ isLoading: true, error: null })
    try {
      const services = await getServices()
      set({ services })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const products = await getProducts()
      set({ products })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchRecords: async () => {
    set({ isLoading: true, error: null })
    try {
      const records = await getRecords()
      set({ records })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  fetchProdCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const productCategories = await getProductCategories()
      set({ productCategories })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  fetchProdProviders: async () => {
    set({ isLoading: true, error: null })
    try {
      const productProviders = await getProductProviders()
      set({ productProviders })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  fetchServCategories: async () => {
    set({ isLoading: true, error: null })
    try {
      const serviceCategories = await getServiceCategories()
      set({ serviceCategories })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  },
  fetchServVariations: async () => {
    set({ isLoading: true, error: null })
    try {
      const serviceVariations = await getServiceVariations()
      set({ serviceVariations })
    } catch (error) {
      set({ error: error.message })
    } finally {
      set({ isLoading: false })
    }
  }
}))
