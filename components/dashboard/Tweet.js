import React, { useEffect, useState, useLayoutEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { validURL } from "../constants";
import LogHeader from "../LogHeader";
import { FaTwitter } from "react-icons/fa";

const Loader = dynamic(() => import("../Loader"), { ssr: false });

// const ConditionalLink = ({ children, to, condition }) =>
//   condition ? (
//     <Link href={to} to={to}>
//       <a
//         target="_blank"
//         className={`flex flex-col items-stretch mb-2 ${
//           condition ? "cursor-pointer" : "cursor-auto"
//         }`}
//       >
//         {children}
//       </a>
//     </Link>
//   ) : (
//     <>{children}</>
//   );

function Tweet(props) {
  const { darkModeActive } = props;

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loader fullscreen={false} darkModeActive={darkModeActive} />;
  }

  let rt = props.retweeted_status;
  const truncated = rt ? props.retweeted_status.truncated : props.truncated;
  let text = rt ? props.retweeted_status.text : props.text;
  let profileImage = rt
    ? props.retweeted_status.user.profile_image_url_https
    : props.user.profile_image_url_https;

  let userName = rt ? props.retweeted_status.user.name : props.user.name;
  let screenName = rt
    ? props.retweeted_status.user.screen_name
    : props.user.screen_name;

  let url, image;
  let parts = text.split(" ");
  url = parts.pop();
  const isUrl = url ? validURL(url) : false;
  let images = [];
  if (props.extended_entities && props.extended_entities.media) {
    props.extended_entities.media.map((m) => {
      images.push(m.media_url_https);
    });
  }

  // console.log(props);

  return (
    <div className="mb-5">
      <LogHeader
        {...props}
        darkModeActive={darkModeActive}
        icon={<FaTwitter size={30} />}
      />
      <div className={`flex flex-wrap max-w-2xl rounded-lg py-2 px-2`}>
        <div className="flex flex-0 pr-4 py-1 items-start">
          <img src={profileImage} className="w-8 h-8 rounded" />
        </div>
        <div className="flex flex-1 flex-wrap flex-col items-start">
          <div className="flex flex-1 flex-row items-center">
            <label className="flex pr-3 dark:text-white text-black">
              {userName}
            </label>
            <i className="flex text-xs dark:text-white text-black">
              @{screenName}
            </i>
          </div>
          <small className="flex dark:text-white text-black">
            {truncated ? `${text}...` : `${text}`}
          </small>
          <div className="max-w-2xl flex flex-wrap justify-start items-start rounded-sm">
            {images.length
              ? images.map((image, i) => {
                  return (
                    <img key={`image-${i}`} className="w-72 mt-1" src={image} />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
