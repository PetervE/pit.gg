import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { validURL } from "../constants";
import LogHeader from "../LogHeader";
import { FaMobile } from "react-icons/fa";

import peter from "../../public/images/profile.jpg";

const Loader = dynamic(() => import("../Loader"), { ssr: false });

function Project(props) {
  const { darkModeActive } = props;
  console.log(props);
  return (
    <div className="mb-5">
      <LogHeader
        {...props}
        darkModeActive={darkModeActive}
        icon={<FaMobile size={30} />}
      />
      <div className={`flex flex-wrap max-w-2xl rounded-lg py-2 px-2`}>
        <div className="flex flex-0 pr-4 py-1 items-start">
          <img src={peter} className="w-8 h-8 rounded" />
        </div>
        <div className="flex flex-1 flex-wrap flex-col items-start">
          <div className="flex flex-1 flex-row items-center">
            <label className="flex pr-3 dark:text-white text-black">
              Project
            </label>
          </div>
          <div className="max-w-2xl flex flex-nowrap justify-start items-start rounded-sm">
            PRROJECT
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
