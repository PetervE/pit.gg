import Head from "next/head";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Storage } from "aws-amplify";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import Toggle from "react-toggle";
import { IconContext } from "react-icons";
import { FaMoon, FaSun } from "react-icons/fa";

import { randomHue } from "../components/constants";

import NivoLine from "../components/NivoLine";
import NivoBar from "../components/NivoBar";

export default function Home() {
  const [darkModeActive, setDarkModeActive] = useState(true);

  useEffect(() => {
    checkLocalStorage();
    return () => {};
  }, []);

  const checkLocalStorage = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    }
  };

  const toggleColorMode = () => {
    if (localStorage.theme === "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col dark:bg-white dark:bg-gray-800">
      <Head>
        <title>Peter van Egeraat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-grow-0 bg-blue-400 dark:bg-gray-400 justify-end p-5">
        <div className="flex flex-1">
          <h1>Peter van Egeraat</h1>
        </div>
        <div className="flex flex-0">
          <Toggle
            className="h-5"
            defaultChecked={darkModeActive}
            icons={{
              checked: (
                <IconContext.Provider value={{ color: "white" }}>
                  <div className="h-5">
                    <FaMoon />
                  </div>
                </IconContext.Provider>
              ),
              unchecked: (
                <IconContext.Provider value={{ color: "#fbbf24" }}>
                  <div className="h-5">
                    <FaSun />
                  </div>
                </IconContext.Provider>
              ),
            }}
            onChange={toggleColorMode}
          />
        </div>
      </nav>
      <div className="flex flex-1 flex-wrap">
        <h1>HAllo</h1>
      </div>
    </div>
  );
}
