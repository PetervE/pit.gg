import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";

import Loader from "../components/Loader";

export default function Home(props) {
  const { setStore, darkModeActive, gymLogs } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (gymLogs && gymLogs.workouts) setLoading(false);
  }, [gymLogs]);

  const init = async () => {
    if (!gymLogs) {
      const raw = await fetch("/api/amplify/fitness");
      const data = await raw.json();
      setStore({ key: "gymLogs", value: data });
    }
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div className="flex flex-1 flex-col justify-center items-stretch flex-col py-2 sm:px-10 px-5">
      <div className="flex flex-wrap flex-col items-start">
        {gymLogs.workouts
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((w) => {
            const date = formatDistance(new Date(w.date), new Date(), {
              addSuffix: true,
            });

            return (
              <div
                key={w.id}
                className="flex flex-wrap flex-col justify-start items-start mb-5"
              >
                <h1 className="dark:text-white text-black py-3">{date}</h1>
                <div className="flex flex-wrap">
                  {w.exercises.map((e) => {
                    return (
                      <label key={e.id} className="bg-gray-200 mr-1 mb-1 px-2 py-2">
                        {e.type.replace("-", " ")}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
