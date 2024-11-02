import toast from "react-hot-toast";
import { create } from "zustand";

export const useParentStore = create((set) => ({
  parent: [],
  appointments: [],
  pregnancies: [],
  loading: true,
  fetchParent: async (id) => {
    const url = `/api/parents/${id}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ pregnancies: data, loading: false });
    } catch (error) {
      console.error("Error fetching parent: ", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },

  fetchPregnancies: async () => {
    const url = `/api/present_pregnancies`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ parent: data, loading: false });
    } catch (error) {
      console.error("Error fetching pregnancy: ", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },

  fetchAppointments: async (id) => {
    const url = `/api/parents/${id}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ parent: data, loading: false });
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

  fetchProvider: async (id) => {
    set({ beds: [], loading: true });
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
    const providerUrl = `/api/deliveries/provider/${id}`;
    const url = `/api/deliveries`;

    try {
      const apiUrl = role === "provider" ? providerUrl : url;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
      set({ deliveries: data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error("Error fetching deliveries", error);
    }
  },
  fetchLabTests: async (id) => {
    const role = sessionStorage.getItem("userRole");
    const providerUrl = `/api/labtests/provider/${id}`;
    const url = `/api/labtests`;

    try {
      const apiUrl = role === "lab_technician" ? providerUrl : url;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
      }

      const data = await response.json();
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
      set({ rooms: data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching rooms:", error); // Log the error for debugging
    }
  },
  fetchBeds: async (id) => {
    const url = `/api/availableroom/beds/${id}`;
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
      set({ beds: data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching beds:", error); // Log the error for debugging
    }
  },
  resetStore: (resetType) => {
    if (resetType === "beds") {
      set({ beds: [] });
    } else {
      set({
        provider: [],
        deliveries: [],
        labTests: [],
        discharge_summaries: [],
        admission: [],
        rooms: [],
        beds: [],
        loading: true, // Reset everything if no type is specified
      });
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

export const useUsersStore = create((set) => ({
  data: {
    providers: [],
    users: [],
    vaccines: [],
    medications: [],
    payments: [],
    present_pregnancies: [],
    previous_pregnancies: [],
    medical_info: [],
    vacination_records: [],
    medicines: [],
    prescriptions: [],
    parents: [],
    documents: [],
    children: [],
    lab_tests: [],
    appointments: [],
    deliveries: [],
    discharge_summaries: [],
    rooms: [],
    admissions: [],
    beds: [],
    births: [],
  },
  loading: true,

  // Fetch all the data for every table
  fetchAllData: async () => {
    const endpoints = [
      { key: "providers", url: "/api/providers" },
      { key: "users", url: "/api/users" },
      { key: "vaccines", url: "/api/vaccines" },
      { key: "medications", url: "/api/medications" },
      { key: "medical_info", url: "/api/medical_info" },
      { key: "payments", url: "/api/payments" },
      { key: "present_pregnancies", url: "/api/present_pregnancies" },
      { key: "previous_pregnancies", url: "/api/previous_pregnancies" },
      { key: "vacination_records", url: "/api/records" },
      { key: "medicines", url: "/api/medicines" },
      { key: "prescriptions", url: "/api/prescriptions" },
      { key: "parents", url: "/api/parents" },
      { key: "documents", url: "/api/documents" },
      { key: "children", url: "/api/children" },
      { key: "lab_tests", url: "/api/labtests" },
      { key: "appointments", url: "/api/appointments" },
      { key: "deliveries", url: "/api/deliveries" },
      { key: "discharge_summaries", url: "/api/discharge_summaries" },
      { key: "rooms", url: "/api/rooms" },
      { key: "admissions", url: "/api/admissions" },
      { key: "beds", url: "/api/beds" },
      { key: "births", url: "/api/births" },
    ];

    set({ loading: true });

    try {
      const promises = endpoints.map(async (endpoint) => {
        const res = await fetch(endpoint.url);
        if (!res.ok) throw new Error(`Error fetching ${endpoint.key}`);
        const data = await res.json();
        return { key: endpoint.key, data };
      });

      const results = await Promise.all(promises);

      const updatedData = results.reduce((acc, result) => {
        acc[result.key] = result.data;
        return acc;
      }, {});

      set((state) => ({
        data: { ...state.data, ...updatedData },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error("Error fetching data");
      console.error("Error fetching data: ", error);
    }
  },
}));

export const useProvidersStore = create((set) => ({
  data: {
    // payments: [],
    vacination_records: [],
    prescriptions: [],
    lab_tests: [],
    appointments: [],
    deliveries: [],
    medicines: [],
    discharge_summaries: [],
    medications: [],
    admissions: [],
    children: [],
    present_pregnancies: [],
    previous_pregnancies: [],
    medical_info: [],
    births: [],
  },
  loading: true,

  // Fetch all the data for every table based on id
  fetchAllData: async (id) => {
    const endpoints = [
      // { key: "payments", url: "/api/payments" },
      { key: "vacination_records", url: `/api/records/provider/${id}` },
      { key: "medications", url: `/api/medications/provider/${id}` },
      { key: "medicines", url: "/api/medicines" },
      { key: "medical_info", url: "/api/medical_info" },
      {
        key: "present_pregnancies",
        url: `/api/present_pregnancies/provider/${id}`,
      },
      {
        key: "previous_pregnancies",
        url: `/api/previous_pregnancies/provider/${id}`,
      },
      {
        key: "prescriptions",
        url: `/api/prescriptions/provider/${id}`,
      },
      { key: "lab_tests", url: `/api/labtests/provider/${id}` },
      { key: "appointments", url: `/api/appointments/provider/${id}` },
      { key: "children", url: `/api/children` },
      { key: "deliveries", url: `/api/deliveries/provider/${id}` },
      {
        key: "discharge_summaries",
        url: `/api/discharge_summaries/provider/${id}`,
      },
      { key: "admissions", url: `/api/admissions/provider/${id}` },
      { key: "births", url: `/api/births/provider/${id}` },
    ];

    set({ loading: true });

    try {
      const promises = endpoints.map(async (endpoint) => {
        const res = await fetch(endpoint.url);
        if (!res.ok) throw new Error(`Error fetching ${endpoint.key}`);
        const data = await res.json();
        return { key: endpoint.key, data };
      });

      const results = await Promise.all(promises);
      console.log(results);

      const updatedData = results.reduce((acc, result) => {
        acc[result.key] = result.data;
        return acc;
      }, {});

      set((state) => ({
        data: { ...state.data, ...updatedData },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error("Error fetching data");
      console.error("Error fetching data: ", error);
    }
  },
}));

export const useParentsStore = create((set) => ({
  data: {
    // payments: [],
    vacination_records: [],
    prescriptions: [],
    documents: [],
    children: [],
    lab_tests: [],
    appointments: [],
    deliveries: [],
    discharge_summaries: [],
    medications: [],
    admissions: [],
    present_pregnancies: [],
    previous_pregnancies: [],
    medical_info: [],
    births: [],
  },
  // providers: [],
  parent: [],
  loading: true,

  fetchProviders: async () => {
    const url = `/api/providers`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ providers: data, loading: false });
    } catch (error) {
      console.error("Error fetching providers: ", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },
  fetchParents: async () => {
    const url = `/api/parents`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ providers: data, loading: false });
    } catch (error) {
      console.error("Error fetching providers: ", error);
      set({ loading: false }); // Stop loading even if there's an error
    }
  },
  fetchMedicines: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/medicines");
      if (!res.ok) throw new Error("Error fetching medicines");
      const medicines = await res.json();

      set((state) => ({
        data: { ...state.data, medicines },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching medicines:", error);
    }
  },
  // Fetch all the data for every table based on parentId
  fetchAllData: async (id) => {
    const endpoints = [
      // { key: "payments", url: "/api/payments" },
      { key: "vacination_records", url: `/api/records/parent/${id}` },
      {
        key: "prescriptions",
        url: `/api/prescriptions/parent/${id}`,
      },
      { key: "documents", url: `/api/documents/parent/${id}` },
      { key: "children", url: `/api/children/parent/${id}` },
      { key: "medical_info", url: `/api/medical_info/parent/${id}` },
      { key: "lab_tests", url: `/api/labtests/parent/${id}` },
      { key: "appointments", url: `/api/appointments/parent/${id}` },
      { key: "deliveries", url: `/api/deliveries/parent/${id}` },
      {
        key: "discharge_summaries",
        url: `/api/discharge_summaries/parent/${id}`,
      },
      { key: "admissions", url: `/api/admissions/parent/${id}` },

      { key: "medications", url: `/api/medications/parent/${id}` },
      { key: "medical_info", url: `/api/medical_info/parent/${id}` },
      {
        key: "present_pregnancies",
        url: `/api/present_pregnancies/parent/${id}`,
      },
      {
        key: "previous_pregnancies",
        url: `/api/previous_pregnancies/parent/${id}`,
      },
      { key: "births", url: `/api/births/parent/${id}` },
    ];

    set({ loading: true });

    try {
      const promises = endpoints.map(async (endpoint) => {
        const res = await fetch(endpoint.url);
        if (!res.ok) throw new Error(`Error fetching ${endpoint.key}`);
        const data = await res.json();
        return { key: endpoint.key, data };
      });

      const results = await Promise.all(promises);

      const updatedData = results.reduce((acc, result) => {
        acc[result.key] = result.data;
        return acc;
      }, {});

      set((state) => ({
        data: { ...state.data, ...updatedData },
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error("Error fetching data");
      console.error("Error fetching data: ", error);
    }
  },
}));

export const usePregnanciesStore = create((set) => ({
  pregnancies: [],
  loadState: true,
  fetchPregnancies: async () => {
    const url = `/api/present_pregnancies`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
      const data = await res.json();
      set({ pregnancies: data, loadState: false });
    } catch (error) {
      console.error("Error fetching pregnancy: ", error);
      set({ loadState: false });
    }
  },
}));
