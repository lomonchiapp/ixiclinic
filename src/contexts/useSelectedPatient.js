
import {create} from 'zustand';

export const useSelectedPatient = create((set) => ({
  patient: {},
  setPatient: (patient) => set({patient}),
}));