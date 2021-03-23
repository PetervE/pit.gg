import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import peter from "../../public/images/profile.jpg";

import { validURL } from "../constants";
import LogHeader from "../LogHeader";
import { CgGym } from "react-icons/cg";

const Loader = dynamic(() => import("../Loader"), { ssr: false });

function WeightliftingLog(props) {
  const { darkModeActive, exercises } = props;

  console.log(props);

  return (
    <div className="mb-5">
      <LogHeader
        {...props}
        darkModeActive={darkModeActive}
        icon={<CgGym size={30} />}
      />
      <Link href={`/posts/${props.slug}`}>
        <div
          className={`flex flex-wrap max-w-2xl rounded-lg py-2 px-2 cursor-pointer ${"dark:hover:bg-gray-900 hover:bg-blue-100"}`}
        >
          <div className="flex flex-0 pr-4 py-1 items-start">
            <img src={peter} className="w-8 h-8 rounded" />
          </div>
          <div className="flex flex-1 flex-wrap flex-col items-start">
            <div className="flex flex-1 flex-row items-center">
              <label className="flex pr-3 dark:text-white text-black">
                Peter van Egeraat
              </label>
            </div>
            <div className="flex flex-col items-stretch">
              {exercises.map((e, x) => {
                return (
                  <div
                    key={`${e.id}-${x}`}
                    className="bg-green-400 my-1 mx-1 rounded"
                  >
                    <h4 className="dark:text-white text-black text-left px-1 py-0.5">
                      {e.type.replaceAll("-", " ")}
                    </h4>
                    {e.sets.map((s, i) => {
                      return null;
                      return (
                        <label
                          key={`${s.id}-${i}`}
                          className="dark:text-white text-black mr-5"
                        >
                          {s.weight * s.reps}KG
                        </label>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default WeightliftingLog;
