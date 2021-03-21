import Link from "next/link";
import dynamic from "next/dynamic";
import peter from "../../public/images/profile.jpg";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { format, parseISO, toDate } from "date-fns";

import React, { useState, useEffect } from "react";

import PROJECTS from "../../json/projects.json";
import EDUCATION from "../../json/education.json";
import WORK_HISTORY from "../../json/work.json";

const Loader = dynamic(() => import("../../components/Loader"), { ssr: false });

function Posts(props) {
  const { setStore, darkModeActive } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div className="flex justify-start flex-col sm:px-10 px-5 py-2 mt-5">
      Posts
    </div>
  );
}

export default Posts;
