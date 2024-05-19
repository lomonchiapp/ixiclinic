import {create} from 'zustand';

const useInvoiceState = create((set, get) => ({
  products: [],
  descriptions: [],
  client: "",
  prefix: "INV-",
  date: new Date(),
  tax: 0,
  comments: "",
  rate: 0,
  quantity: 1,
  total: 0,
  subtotal: 0,
  shipping: 0,
  method: "",
  discount: 0,
  setProducts: (products) => set({ products }),
  setDescriptions: (descriptions) => set({ descriptions }),
  setClient: (client) => set({ client }),
  setPrefix: (prefix) => set({ prefix }),
  setDate: (date) => set({ date }),
  setTax: (tax) => set({ tax }),
  setComments: (comments) => set({ comments }),
  setRate: (rate) => set({ rate }),
  setQuantity: (quantity) => set({ quantity }),
  setTotal: (total) => set({ total }),
  setSubtotal: (subtotal) => set({ subtotal }),
  setShipping: (shipping) => set({ shipping }),
  setMethod: (method) => set({ method }),
  setDiscount: (discount) => set({ discount }),

}));

export default useInvoiceState;
