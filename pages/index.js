import Link from "next/link";
import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

export default function Home({ darkModeActive }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const raw = await fetch("/api/amplify/fitness");
    const data = await raw.json();
    const { workouts } = data;
    console.log("INIT", data);

    setLoading(false);
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div className="flex flex-1 justify-center items-center flex-col py-2">
      <div className="flex flex-0">
        <Link href="/resume">
          <a>Resume</a>
        </Link>
        <Link href="/fitness">
          <a>Fitness</a>
        </Link>
      </div>
    </div>
  );
}
