import create from "zustand";
import { persist } from "zustand/middleware";

const store = create(
  persist((set) => ({
    // general
    setStore: ({ key, value }) => {
      console.log("STORE", key, value);
      set({ [key]: value });
    },
    darkModeActive: true,
    // fitness
    gymLogs: false,
  }))
);

export default store;
