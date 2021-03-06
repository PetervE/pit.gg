import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    return () => {};
  }, []);

  const toggleColorMode = () => {
    console.log("current", localStorage.theme);
    if (localStorage.theme === "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800">
      <Head>
        <title>Peter van Egeraat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-blue-400 dark:bg-red-400">
        <button onClick={toggleColorMode}>Toggle</button>
      </nav>
      <div className="h-screen flex flex-col flex-wrap justify-center content-center">
        <h1 className="text-gray-900 text-5xl font-display dark:text-white">Dark mode is here!</h1>
        <p className="text-gray-900 text-base font-body dark:text-white">Some content text</p>
      </div>
    </div>
  );
}
