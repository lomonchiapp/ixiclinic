// store.js
import {create} from 'zustand';

export const sProductState = create((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
