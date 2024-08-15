import {create} from 'zustand';

export const usePrescState = create((set) => ({
  patient:'',
  doctor:'',
  description:'',
  onWeeks: [],
  medicines:[],
  durations:[],
  dosages:[],
  frequencies:[],
  administrations:[],
  setOnWeeks: (onWeeks) => set({onWeeks}),
  setDescription: (description) => set({description}),
  setPatient: (patient) => set({patient}),
  setDoctor: (doctor) => set({doctor}),
  setMedicines: (medicines) => set({medicines}),
  setDurations: (durations) => set({durations}),
  setDosages: (dosages) => set({dosages}),
  setFrequencies: (frequencies) => set({frequencies}),
  setAdministrations: (administrations) => set({administrations}),
}));
