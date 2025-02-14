import { create } from 'zustand';
import * as FileSystem from 'expo-file-system';


const useRecordsStore = create((set, get) => ({
  items: [],

  fetchItems: async () => {
    try {
      const uri = FileSystem.documentDirectory 
      const files = await FileSystem.readDirectoryAsync(uri);
      
      set({ items: files });
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  },

  
//   addItem: (item) =>
//     set((state) => ({
//       items: [...state.items, item],
//     })),


  clearItems: () => set({ items: [] }),


  updateItem: ( updatedItem) =>
    set((state) => ({
      items: state.items.filter((item) => item !== updatedItem ),
    })),
}));

export default useRecordsStore;