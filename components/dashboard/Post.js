import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { validURL } from "../constants";

const Loader = dynamic(() => import("../Loader"), { ssr: false });

function Post(props) {
  const { darkModeActive, coverImage, brief } = props;
  // console.log(props);
  return (
    <Link href={`/posts/${props.slug}`}>
      <div
        className={`flex flex-wrap max-w-2xl rounded-lg py-2 px-2 cursor-pointer ${"dark:hover:bg-gray-900 hover:bg-blue-100"}`}
      >
        <div className="flex flex-0 pr-4 py-1 items-start">
          <img src={coverImage} className="w-8 h-8 rounded" />
        </div>
        <div className="flex flex-1 flex-wrap flex-col items-start">
          <div className="flex flex-1 flex-row items-center">
            <label className="flex pr-3 dark:text-white text-black">
              Peter van Egeraat
            </label>
          </div>
          <small className="flex dark:text-white text-black">{brief}</small>
        </div>
      </div>
    </Link>
  );
}

export default Post;
