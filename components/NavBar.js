import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Toggle from "react-toggle";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Navbar({ setStore, darkModeActive }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleColorMode = () => {
    if (darkModeActive) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setStore({ key: "darkModeActive", value: false });
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setStore({ key: "darkModeActive", value: true });
    }
  };
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-100 dark:bg-gray-600 justify-end py-5">
        <Head>
          <title>Peter van Egeraat</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="container px-4 flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link href="/">
              <a className="flex flex-0 flex-col">
                <h1 className="dark:text-white text-2xl font-display">
                  Peter van Egeraat
                </h1>
                <span className="dark:text-white text-l font-body">
                  Software Engineer
                </span>
              </a>
            </Link>
          </div>
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

          <div
            className={
              "md:visible lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link href="/resume">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Resume</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/fitness">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Fitness</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <a
            className="md:visible lg:invisible"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <div className="tham tham-e-squeeze tham-w-6">
              <div className="tham-box">
                <div className="tham-inner" />
              </div>
            </div>
          </a>
        </div>
      </nav>
    </>
  );
}
