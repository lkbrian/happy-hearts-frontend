import toast from "react-hot-toast";
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
      console.log("store data", data); // Log the fetched parent data
    } catch (error) {
      console.error("Error fetching parent: ", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },
}));
export const useProviderStore = create((set) => ({
  provider: [],
  deliveries: [],
  labTests: [],
  discharge_summaries: [],
  admission: [],
  rooms: [],
  beds: [],
  loading: true,

  // Fetch provider data
  fetchProvider: async (id) => {
    const url = `/api/providers/${id}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ provider: data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error("Error fetching provider data", error);
    }
  },

  // Fetch deliveries data
  fetchDeliveries: async (id) => {
    const role = sessionStorage.getItem("userRole");
    const providerUrl = `/api/deliveries_for_provider/${id}`;
    const url = `/api/deliveries`;

    try {
      const apiUrl = role === "provider" ? providerUrl : url;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched deliveries:", data);
      set({ deliveries: data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error("Error fetching deliveries", error);
    }
  },
  fetchLabTests: async (id) => {
    const role = sessionStorage.getItem("userRole");
    const providerUrl = `/api/labtests_for_provider/${id}`;
    const url = `/api/labtests`;

    try {
      const apiUrl = role === "lab_technician" ? providerUrl : url;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched labtests:", data);
      set({ labTests: data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error("Error fetching deliveries", error);
    }
  },

  // Fetch discharge summaries
  fetchDischargeSummaries: async () => {
    const url = `/api/discharge_summaries`;
    set({ loading: true }); // Set loading to true at the start

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched sumaries:", data);
      set({ discharge_summaries: data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error("Error fetching discharge summaries:", error); // Log the error for debugging
    }
  },

  // Fetch admissions data
  fetchAdmissions: async () => {
    const url = `/api/admissions`;
    set({ loading: true }); // Set loading to true at the start

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched admissions:", data);
      set({ admissions: data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching admissions:", error); // Log the error for debugging
    }
  },
  fetchRooms: async () => {
    const url = `/api/available_rooms`;
    set({ loading: true }); // Set loading to true at the start

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched rooms:", data);
      set({ rooms: data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching rooms:", error); // Log the error for debugging
    }
  },
  fetchBeds: async (id) => {
    const url = `/api/available_beds/${id}`;
    set({ loading: true }); // Set loading to true at the start

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.msg || "An error occurred", {
          position: "top-right",
          autoClose: 6000,
        });
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched beds:", data);
      set({ beds: data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching beds:", error); // Log the error for debugging
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
