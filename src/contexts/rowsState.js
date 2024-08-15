import {create} from 'zustand'


function newRow() {
  setInputValues(previnput => [...previnput, {
    product: '',
    quantity: 0,
    rate: 0,
    discount: 0,
    tax: 0
  }]);
}

const useinputState = create((set, get) => ({
  inputValues: [
    {
      num: 1,
      product: '',
      quantity: 0,
      rate: 0,
      discount: 0,
      tax: 0
    }
  ],
  selectedValues: [
    {
      product: '',
      quantity: 0,
      rate: 0,
      discount: 0,
      tax: 0
    }
  ],
  count: 1,
  addRow: () => set(state => ({
    ...state,
    inputValues: [
      ...state.inputValues,
      {
        num: state.count + 1,
        product: '',
        quantity: 0,
        rate: 0,
        discount: 0,
        tax: 0
      }
    ],
    count: state.count + 1
  })),
  newRow: () => newRow(),
  removeRow: (index) => set(state => ({
    ...state,
    inputValues: state.inputValues.filter((row, i) => i !== index),
    count: state.count - 1,
  })),
  updateRow: (index, key, value) => set(state => ({
    ...state,
    inputValues: state.inputValues.map((row, i) => i === index ? {...row, [key]: value} : row),
  })),
  setSelectedValues: (selectedValues) => set({selectedValues}),
  setInputValues: (inputValues) => set({inputValues}),
  setCount: (count) => set({count})
}))

export default useinputState;
