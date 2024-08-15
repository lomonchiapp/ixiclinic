import {create} from 'zustand';

export const useProductState = create((set) => ({
  name:'',
  description:'',
  price:'',
  category:'',
  cost:'',
  provider:'',
  stock:'',
  setName: (name) => set({name}),
  setProduct: (product) => set({product}),
  setCategory: (category) => set({category}),
  setPrice: (price) => set({price}),
  setCost: (cost) => set({cost}),
  setProvider: (provider) => set({provider}),
  setStock: (stock) => set({stock}),
  reset: () => set({name:'', description:'', price:'', cost:'', provider:'', stock:''}),

}));
