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
    weightliftingLogs: null,
    weightliftingVideos: null,
    // blog
    blogPosts: null,
    // social
    tweets: null,
  }))
);

export default store;
