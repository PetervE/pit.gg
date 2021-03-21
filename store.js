import create from "zustand";
import { persist } from "zustand/middleware";

import PROJECTS from "./json/projects.json";
import EDUCATION from "./json/education.json";
import WORK_HISTORY from "./json/work.json";

const store = create(
  persist((set) => ({
    // general
    setStore: ({ key, value }) => {
      console.log("STORE", key, value);
      set({ [key]: value });
    },
    darkModeActive: null,
    user: null,
    // resume
    PROJECTS,
    EDUCATION,
    WORK_HISTORY,
    // fitness
    weightliftingLogs: false,
    weightliftingVideos: false,
    // blog
    blogPosts: false,
  }))
);

export default store;
