import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import DarkModeToggle from "react-dark-mode-toggle";
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
      <nav
        className={`flex flex-col lg:flex-row items-stretch justify-stretch px-5 navbar-expand-lg bg-gray-100 dark:bg-gray-600 justify-start py-3`}
      >
        <Head>
          <title>Peter van Egeraat</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="flex flex-1 items-center">
          <div className="flex flex-1 flex-col justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="flex flex-1">
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
          </div>

          <div className="flex flex-0 flex-col mr-5">
            <div className="flex flex-0 items-center justify-center">
              <DarkModeToggle
                onChange={toggleColorMode}
                checked={darkModeActive}
                size={60}
              />
            </div>
          </div>

          <div className="flex flex-0 justify-center items-center">
            <div className="flex justify-center items-center">
              <a
                className="cursor-pointer flex md:visible lg:invisible w-20 h-20 justify-center items-center"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <div className="flex tham tham-e-squeeze tham-w-6">
                  <div className="tham-box">
                    <div
                      className={`tham-inner bg-${
                        darkModeActive ? "white" : "black"
                      }`}
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-0 flex-col justify-center">
          <div
            className={`md:visible lg:flex items-center justify-center
              ${navbarOpen ? " flex pt-5" : " hidden"}
            `}
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto justify-center">
              <li className="nav-item">
                <Link href="/resume">
                  <a
                    onClick={() => setNavbarOpen(false)}
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg opacity-75"></i>
                    <span
                      className={`ml-2 py-5 ${
                        darkModeActive ? "text-white" : "text-black"
                      }`}
                    >
                      Resume
                    </span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/fitness">
                  <a
                    onClick={() => setNavbarOpen(false)}
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg opacity-75"></i>
                    <span
                      className={`ml-2 py-5 ${
                        darkModeActive ? "text-white" : "text-black"
                      }`}
                    >
                      Fitness
                    </span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
