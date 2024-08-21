
import {create} from 'zustand';

export const useSelectedRecord = create((set) => ({
  record: {},
  setRecord: (record) => set({record}),
}));