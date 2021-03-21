import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { validURL } from "../constants";

const Loader = dynamic(() => import("../Loader"), { ssr: false });

function Post(props) {
  const { darkModeActive } = props;

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader fullscreen={false} darkModeActive={darkModeActive} />;
  }
  console.log(props);
  return (
    <Link href={`/posts/${props.slug}`}>
      <div
        className={`flex flex-wrap max-w-2xl rounded-lg py-2 px-2 ${"dark:hover:bg-gray-900 hover:bg-blue-100"}`}
      >
        <p>{props.brief}</p>
      </div>
    </Link>
  );
}

export default Post;
