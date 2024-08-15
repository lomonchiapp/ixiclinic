// store.js
import {create} from 'zustand';

export const sServiceState = create((set) => ({
  product: null,
  setService: (service) => set({ service }),
}));
