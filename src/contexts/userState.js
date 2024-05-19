import {create} from 'zustand';

const useUserState = create<userState>((set, get) => ({
  user: null,
  phone: "",
  email: "",
  setUser: (user) => set({ user }),
  setPhone: (phone) => set({ phone }),
  setEmail: (email) => set({ email }),
}));

export default useUserState;

