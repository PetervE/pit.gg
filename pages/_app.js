import "../components/configure";

import "../styles/globals.css";

import store from "../store";

import { format, parseISO, toDate } from "date-fns";

import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";

import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import { Storage } from "aws-amplify";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function MyApp({ Component, pageProps }) {
  const storage = store((state) => state);
  const { setStore, darkModeActive } = storage;

  useEffect(() => {
    checkLocalStorage();
  }, []);

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
