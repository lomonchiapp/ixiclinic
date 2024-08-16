import {create} from 'zustand'

const initialState = {
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    isAllergic: false,
    allergy: '',
    usedProducts: '',
    skinType: '',
    pastProcedures: '',
    suggestions: '',
    notes: '',
    rnc: '',
    email: ''
}

export const usePatientStore = create((set) => ({
    patient: initialState,
    selectedPatient: null,
    setPatient: (patient) => set({patient}),
    setSelectedPatient: (selectedPatient) => set({selectedPatient}),
    resetPatient: () => set({patient: initialState})
    }))
