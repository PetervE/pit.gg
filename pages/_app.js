import "../components/configure";

import "react-toggle/style.css";
import "../styles/globals.css";

import { format, parseISO, toDate } from "date-fns";
import nl from "date-fns/locale/nl";

import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Head from "next/head";
import Link from "next/link";
import Toggle from "react-toggle";
import Select from "react-select";
import { Storage } from "aws-amplify";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function MyApp({ Component, pageProps }) {
  const [darkModeActive, setDarkModeActive] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLocalStorage();
    return () => {
      setLoading(true);
    };
  }, []);

  const checkLocalStorage = () => {
    let status = localStorage.getItem("theme");

    if (status === "light") {
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    }
    setLoading(false);
  };

  const toggleColorMode = () => {
    if (darkModeActive) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    }
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div className="min-h-screen flex flex-1 flex-col bg-white dark:bg-white dark:bg-gray-800">
      <Head>
        <title>Peter van Egeraat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-grow-0 bg-gray-100 dark:bg-gray-600 justify-end py-5">
        <Link href="/">
          <a className="flex flex-0 flex-col sm:px-10 pl-5 pr-3">
            <h1 className="dark:text-white text-2xl font-display">
              Peter van Egeraat
            </h1>
            <span className="dark:text-white text-l font-body">
              Software Engineer
            </span>
          </a>
        </Link>
        <div className="flex flex-1 sm:px-10 justify-center align-center items-center">
          <div className="flex flex-shrink">
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
        </div>
      </nav>
      <div className="flex flex-1 justify-start align-center flex-col">
        <Component {...pageProps} darkModeActive={darkModeActive} />
      </div>
    </div>
  );
}

export default MyApp;
