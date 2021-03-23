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
        <hr className="flex flex-1" />
        <div className="flex mx-2">{props.icon}</div>
        <hr className="flex flex-1" />
        <span className="dark:text-white text-black pl-5">{date}</span>
      </div>
    </IconContext.Provider>
  );
}

export default LogHeader;
