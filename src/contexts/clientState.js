import {create} from 'zustand';

const useClientState = create((set, get) => ({
    type: "",
    mp_greet: "",
    mp_lastname: "",
    mp_lastname: "",
    displayname: "",
    company: "",
    rnc: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    comments: "",
    amount_due: 0,
    setUser: (user) => set({ user }),
    setMp_greet: (mp_greet) => set({ mp_greet }),
    setMp_lastname: (mp_lastname) => set({ mp_lastname }),
    setDisplayname: (displayname) => set({ displayname }),
    setCompany: (company) => set({ company }),
    setRnc: (rnc) => set({ rnc }),
    setEmail: (email) => set({ email }),
    setAddress: (address) => set({ address }),
    setCity: (city) => set({ city }),
    setPhone: (phone) => set({ phone }),
    setComments: (comments) => set({ comments }),
    setAmount_due: (amount_due) => set({ amount_due }),
}));

export default useClientState;

