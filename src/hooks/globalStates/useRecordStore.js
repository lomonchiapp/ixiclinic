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
    setPatient: (patient) => set({patient}),
    resetPatient: () => set({patient: initialState})
    }))
