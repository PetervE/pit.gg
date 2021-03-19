import Link from "next/link";
import React, { useEffect, useState } from "react";

import Loader from "../components/Loader";

export default function Home({ darkModeActive }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div className="flex flex-1 justify-start align-center flex-col py-2">
      <Link href="/resume">
        <a>Resume</a>
      </Link>
      <Link href="/fitness">
        <a>Fitness</a>
      </Link>
    </div>
  );
}
