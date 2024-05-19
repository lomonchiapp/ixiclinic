import {create} from 'zustand'
import { createData } from 'src/components/functions/createData'
import ProductInput from 'src/components/inputs/ProductInput'
import QuantityInput from 'src/components/inputs/tableInputs'
import RateInput from 'src/components/inputs/tableInputs'
import DiscountInput from 'src/components/inputs/tableInputs'
import TaxInput from 'src/components/inputs/tableInputs'


// Create a store
// First row
const firstRow = createData(<ProductInput />, <QuantityInput />, <RateInput />, <DiscountInput />, <TaxInput />)
const tableState = create((set, get) => ({
  tableIndex: 1,
  rows: [firstRow],
  productInputs: [],
  items: [],
  quantities: [],
  rates: [],
  discounts: [],
  taxes: [],
  total: 0,
  addRow: () => {
    set(state => ({
      rows: [...state.rows, firstRow],
      tableIndex: state.tableIndex + 1
    }))
  },
  removeRow: (index) => {
    set(state => ({
      rows: state.rows.filter((_, i) => i !== index)
    }))
  },
  setProductInputs: (productInputs) => set({ productInputs }),
  setItems: (items) => set({ items }),
  setQuantities: (quantities) => set({ quantities }),
  setRates: (rates) => set({ rates }),
  setDiscounts: (discounts) => set({ discounts }),
  setTaxes: (taxes) => set({ taxes }),
  setTotal: (total) => set({ total }),
  setRows: (rows) => set({ rows }),
  setTableIndex: (index) => set({ tableIndex: index }),
}))

export default tableState;
