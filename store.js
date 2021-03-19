import create from "zustand";
import { persist } from "zustand/middleware";

const store = create(
  persist((set) => ({
    darkModeActive: true,
    setDarkModeActive: (status) => set({ darkModeActive: status }),
  }))
);

export default store;
