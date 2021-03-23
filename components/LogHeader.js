import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { en } from "date-fns/locale";
import { IconContext } from "react-icons";

function LogHeader(props) {
  let date = formatDistance(
    props.DASHBOARD_DATE,
    new Date(),
    { locale: en } // Pass the locale as an option
  );

  return (
    <IconContext.Provider
      value={{ color: props.darkModeActive ? "#fbbf24" : "#CCCCCC" }}
    >
      <div className="flex flex-row justify-center items-center">
        <span className="opacity-25 dark:text-white text-black text-right pr-4 text-sm">
          {date} ago
        </span>
        <hr className="flex flex-1" />
        <div className="flex mx-2">{props.icon}</div>
      </div>
    </IconContext.Provider>
  );
}

export default LogHeader;
