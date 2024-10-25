import toast from "react-hot-toast";
import { create } from "zustand";

export const useParentStore = create((set) => ({
  parent: [],
  appointments: [],
  loading: true,
  fetchParent: async (id) => {
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
  fetchAppointments: async (id) => {
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
      console.log("Fetched deliveries:", data);
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
      console.log("Fetched beds:", data);
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
    // discharge_medications: [],
    // parents_medical_info: [],
    payments: [],
    // present_pregnancies: [],
    // previous_pregnancies: [],
    // resetokens: [],
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
  },
  loading: true,

  // Fetch all the data for every table
  fetchAllData: async () => {
    const endpoints = [
      { key: "providers", url: "/api/providers" },
      { key: "users", url: "/api/users" },
      { key: "vaccines", url: "/api/vaccines" },
      // { key: "discharge_medications", url: "/api/discharge_medications" },
      // { key: "parents_medical_info", url: "/api/parents_medical_info" },
      { key: "payments", url: "/api/payments" },
      // { key: "present_pregnancies", url: "/api/present_pregnancies" },
      // { key: "previous_pregnancies", url: "/api/previous_pregnancies" },
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
      console.log("Fetched all data successfully");
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
    parents_prescriptions: [],
    lab_tests: [],
    appointments: [],
    deliveries: [],
    discharge_summaries: [],
    admissions: [],
  },
  loading: true,

  // Fetch all the data for every table based on id
  fetchAllData: async (id) => {
    const endpoints = [
      // { key: "payments", url: "/api/payments" },
      { key: "vacination_records", url: `/api/records/provider/${id}` },
      {
        key: "parents_prescriptions",
        url: `/api/prescriptions/provider/${id}`,
      },
      { key: "lab_tests", url: `/api/labtests/provider/${id}` },
      { key: "appointments", url: `/api/appointments/provider/${id}` },
      { key: "deliveries", url: `/api/deliveries/provider/${id}` },
      {
        key: "discharge_summaries",
        url: `/api/discharge_summaries/provider/${id}`,
      },
      { key: "admissions", url: `/api/admissions/provider/${id}` },
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

      console.log("Fetched all data successfully");
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
    parents_prescriptions: [],
    documents: [],
    children: [],
    lab_tests: [],
    appointments: [],
    deliveries: [],
    discharge_summaries: [],
    admissions: [],
  },
  providers: [],
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

  // Fetch all the data for every table based on parentId
  fetchAllData: async (id) => {
    const endpoints = [
      // { key: "payments", url: "/api/payments" },
      { key: "vacination_records", url: `/api/records/parent/${id}` },
      {
        key: "parents_prescriptions",
        url: `/api/prescriptions/parent/${id}`,
      },
      { key: "documents", url: `/api/documents/parent/${id}` },
      { key: "children", url: `/api/children/parent/${id}` },
      { key: "lab_tests", url: `/api/labtests/parent/${id}` },
      { key: "appointments", url: `/api/appointments/parent/${id}` },
      { key: "deliveries", url: `/api/deliveries/parent/${id}` },
      {
        key: "discharge_summaries",
        url: `/api/discharge_summaries/parent/${id}`,
      },
      { key: "admissions", url: `/api/admissions/parent/${id}` },
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

      console.log("Fetched all data successfully");
    } catch (error) {
      set({ loading: false });
      toast.error("Error fetching data");
      console.error("Error fetching data: ", error);
    }
  },
}));

// resetStore: () => {
//   set({
//     data: {
//       providers: [],
//       users: [],
//       vaccines: [],
//       payments: [],
//       vacination_records: [],
//       medicines: [],
//       prescriptions: [],
//       parents: [],
//       documents: [],
//       children: [],
//       lab_tests: [],
//       appointments: [],
//       deliveries: [],
//       discharge_summaries: [],
//       rooms: [],
//       admissions: [],
//       beds: [],
//     },
//     loading: true, // Reset loading state if desired
//   });
// },
