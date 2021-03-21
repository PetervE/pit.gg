import create from "zustand";
import { persist } from "zustand/middleware";

const store = create(
  persist((set) => ({
    setStore: ({ key, value }) => {
      console.log("STORE", key, value);
      set({ [key]: value });
    },
    // general
    darkModeActive: null,
    user: null,
    // fitness
    weightliftingLogs: false,
    weightliftingVideos: false,
    // blog
    blogPosts: false,
    // social
    tweets: false,
  }))
);

export default store;
