
import {create} from 'zustand'

const focusedState = create(set => ({
  isFocused: false,
  setIsFocused: (value) => set(() => ({ isFocused: value })),
  // Rest of your state...
}))

export default focusedState;
