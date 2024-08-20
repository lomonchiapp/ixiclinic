import {create} from 'zustand'

const initialState = {
  name: '',
  category: '',
  price: 0,
  cost: 0,
  provider: '',
  stock: 0,
  description: '',
  note: '',
  createdAt: new Date()
}
export const useProductStore = create((set) => ({
  product: initialState,
  setProduct: (product) => set({product}),
  resetProduct: () => set({product: initialState})
  }))
