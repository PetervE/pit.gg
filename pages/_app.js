import "../components/configure";
import "../styles/globals.css";
import "react-toggle/style.css";

import store from "../store";

import { format, parseISO, toDate } from "date-fns";
import { Auth, Storage } from "aws-amplify";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Loader = dynamic(() => import("../components/Loader"), { ssr: false });

function MyApp({ Component, pageProps }) {
  const storage = store((state) => state);
  const { setStore, darkModeActive, user } = storage;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLocalStorage();
  }, []);

  useEffect(() => {
    if (user === null) checkUser();
    if (darkModeActive !== null && user !== null) {
      setLoading(false);
    }
    return () => {
      setLoading(true);
    };
  }, [darkModeActive, user]);

  const checkLocalStorage = () => {
    let status = localStorage.getItem("theme");

    if (status === "light") {
      document.documentElement.classList.remove("dark");
      setStore({ key: "darkModeActive", value: false });
    } else {
      document.documentElement.classList.add("dark");
      setStore({ key: "darkModeActive", value: true });
    }
  };

  const checkUser = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser();
      setStore({ key: "user", value: loggedUser || false });
    } catch (err) {
      setStore({ key: "user", value: false });
    }
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div className="min-h-screen flex flex-1 flex-col bg-white dark:bg-white dark:bg-gray-800">
      <NavBar {...storage} />

      <div className="flex flex-1 justify-start align-center flex-col">
        <Component {...pageProps} {...storage} />
      </div>
    </div>
  );
}

export default MyApp;
