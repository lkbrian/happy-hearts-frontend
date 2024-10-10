import { create } from "zustand";

export const useParentStore = create((set) => ({
  parent: [],
  loading: true,
  fetchParent: async (id) => {
    const url = `/api/parents/${id}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ parent: data, loading: false });
      console.log(data); // Log the fetched parent data
    } catch (error) {
      console.error("Error fetching parent: ", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },
}));


export const useBreadStore = create((set) => ({
  selectedItem: localStorage.getItem("selectedItem") || "", // Initialize from localStorage
  setSelectedItem: (item) => {
    set({ selectedItem: item });
    localStorage.setItem("selectedItem", item); // Save to localStorage
  },
}));

