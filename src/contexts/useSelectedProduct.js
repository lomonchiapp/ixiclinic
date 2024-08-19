// store.js
import {create} from 'zustand';

export const useSelectedProduct = create((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
