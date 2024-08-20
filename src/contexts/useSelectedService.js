
import { reset } from 'browser-sync';
import {create} from 'zustand';

export const useSelectedService = create((set) => ({
  service: {},
  setService: (service) => set({service}),
  resetService: () => set({service: {}})
}));
