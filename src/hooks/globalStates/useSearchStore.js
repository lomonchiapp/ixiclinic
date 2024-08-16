import {create} from 'zustand'

export const useSearchStore = create((set) => ({
    searchText: '',
    setSearchText: (searchText) => set({searchText})
}))