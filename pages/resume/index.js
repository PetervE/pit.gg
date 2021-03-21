import Link from "next/link";
import dynamic from "next/dynamic";
import peter from "../../public/peter.jpg";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { format, parseISO, toDate } from "date-fns";

import React, { useState, useEffect } from "react";

import PROJECTS from "../../json/projects.json";
import EDUCATION from "../../json/education.json";
import WORK_HISTORY from "../../json/work.json";

const Loader = dynamic(() => import("../../components/Loader"), { ssr: false });

function Resume(props) {
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
      <div className="flex justify-start flex-col py-2">
        <div className="flex justify-start flex-col pb-4">
          <div className="flex py-5 flex-wrap flex-row">
            <img
              src={peter}
              alt="Peter"
              height="150"
              width="150"
              style={{ height: 150, width: 150 }}
            />
            <div className="flex flex-1 max-w-md justify-center flex-col">
              <IconContext.Provider
                value={{ color: darkModeActive ? "#fbbf24" : "#CCCCCC" }}
              >
                <div className="flex flex-wrap flex-row justify-evenly py-5">
                  <a
                    className="flex"
                    target="_blank"
                    href="https://github.com/PetervE"
                  >
                    <FaGithub size={30} />
                  </a>
                  <a
                    className="flex"
                    target="_blank"
                    href="https://www.linkedin.com/in/petervanegeraat/"
                  >
                    <FaLinkedin size={30} />
                  </a>
                  <a
                    className="flex"
                    target="_blank"
                    href="https://twitter.com/petervanegeraat"
                  >
                    <FaTwitter size={30} />
                  </a>
                </div>
              </IconContext.Provider>
            </div>
          </div>

          <h1 className="dark:text-white text-3xl font-display pb-2 my-5">
            About
          </h1>
          <div>
            <div className="border-l-2 pl-5 border-gray-800 dark:border-gray-400">
              <p className="dark:text-white text-base font-sans max-w-3xl leading-8 pb-2">
                I use React and React Native to develop applications for Web,
                iOS and Android.
              </p>
              <p className="dark:text-white text-base font-sans max-w-3xl leading-8 pb-2">
                For back-end I use Amazon Web Services (AWS) resulting in
                scalable full stack applications.
              </p>
              <p className="dark:text-white text-base font-sans max-w-3xl leading-8 pb-2">
                Designing new products in Sketch and Adobe software is also
                something I enjoy.
              </p>
              <p className="dark:text-white text-base font-sans max-w-3xl leading-8">
                In my free time you can find me in the gym or spending time with
                members of my{" "}
                <a
                  className="text-blue-400 font-semibold underline"
                  target="_blank"
                  href="http://fearless.gg"
                >
                  Fearless
                </a>{" "}
                organization.
              </p>
            </div>
          </div>
        </div>

        <h1 className="dark:text-white text-3xl font-display pb-2 my-5">
          Work history
        </h1>
        {WORK_HISTORY.map((work, i) => {
          return (
            <div
              key={`work-${i}`}
              className="border-l-2 pl-5 border-gray-800 dark:border-gray-400 mb-10"
            >
              {work.website ? (
                <a
                  target="_blank"
                  href={work.website}
                  className="font-light dark:text-white text-xl my-0 underline"
                >
                  {work.name}
                </a>
              ) : (
                <span
                  target="_blank"
                  className="font-light dark:text-white text-xl my-0"
                >
                  {work.name}
                </span>
              )}
              <p className="my-1 font-light text-sm dark:text-gray-600 flex align-center">
                <small className="text-sm mr-2 dark:text-gray-400">
                  {work.position}
                </small>
                <small>{`${format(
                  new Date(work.begin_date),
                  "LLLL yyyy"
                )}`}</small>
                {work.end_date ? <small className="px-1">{` - `}</small> : null}
                <small>
                  {work.end_date
                    ? `${format(new Date(work.end_date), "LLLL yyyy")}`
                    : ""}
                </small>
              </p>
              <p className="my-1 font-normal dark:text-gray-300 text-base max-w-3xl">
                {work.description}
              </p>
              <div className="flex flex-wrap flex-row justify-start mt-2">
                {work.technologies.map((t, y) => {
                  return (
                    <a
                      key={`${work.name}-${y}-${t.name}`}
                      className="mt-2 mr-2 py-2 px-2 bg-gray-200 text-sm dark:bg-gray-400"
                      target="_blank"
                      href={t.website}
                    >
                      {t.name}
                    </a>
                  );
                })}
              </div>
              {work.languages && (
                <div className="flex flex-wrap flex-row justify-start mt-2 ">
                  {work.languages.map((t, x) => {
                    return (
                      <small
                        key={`${work.name}-${t}-x`}
                        className="mr-1 mt-1 py-1 px-2 bg-gray-100 text-xs dark:bg-gray-500"
                      >
                        {t}
                      </small>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-start flex-col py-2">
        <h1 className="dark:text-white text-3xl font-display pb-2 mb-5">
          Education
        </h1>
        <div className="">
          {EDUCATION.map((education, i) => {
            return (
              <div
                key={`work-${i}`}
                className="border-l-2 pl-5 border-gray-800 dark:border-gray-400 mb-10"
              >
                <a
                  target="_blank"
                  href={education.website}
                  className="font-light dark:text-white text-xl my-0 underline"
                >
                  {education.name}
                </a>
                <p className="my-1 font-light text-sm dark:text-gray-600 flex align-center">
                  <small className="text-sm dark:text-gray-400">
                    {education.position}
                  </small>
                  <small>{`${format(
                    new Date(education.begin_date),
                    "LLLL yyyy"
                  )}`}</small>
                  {education.end_date ? (
                    <small className="px-1">{` - `}</small>
                  ) : null}
                  <small>
                    {education.end_date
                      ? `${format(new Date(education.end_date), "LLLL yyyy")}`
                      : ""}
                  </small>
                </p>
                <p className="my-1 font-normal dark:text-gray-300 text-base max-w-3xl">
                  {education.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-start flex-col py-2">
        <h1 className="dark:text-white text-3xl font-display pb-2 mb-5">
          Projects
        </h1>
        <div className="">
          {PROJECTS.map((project, i) => {
            return (
              <div
                key={`work-${i}`}
                className="border-l-2 pl-5 border-gray-800 dark:border-gray-400 mb-10"
              >
                <div className="flex flex-wrap">
                  <a
                    target="_blank"
                    href={project.website}
                    className="font-light dark:text-white text-xl my-0 underline"
                  >
                    {project.name}
                  </a>

                  <a className="ml-4" target="_blank" href={project.github}>
                    <IconContext.Provider
                      value={{
                        color: darkModeActive ? "#fbbf24" : "#CCCCCC",
                      }}
                    >
                      <div>
                        <FaGithub size={30} />
                      </div>
                    </IconContext.Provider>
                  </a>
                </div>

                <p className="my-1 font-normal dark:text-gray-300 text-base max-w-3xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap flex-row justify-start mt-2">
                  {project.technologies.map((t, y) => {
                    return (
                      <a
                        key={`${project.name}-${y}-${t.name}`}
                        className="mt-2 mr-2 py-2 px-2 bg-gray-200 text-sm dark:bg-gray-400"
                        target="_blank"
                        href={t.website}
                      >
                        {t.name}
                      </a>
                    );
                  })}
                </div>
                {project.languages && (
                  <div className="flex flex-wrap flex-row justify-start mt-2 ">
                    {project.languages.map((t, x) => {
                      return (
                        <small
                          key={`${project.name}-${t}-x`}
                          className="mr-1 mt-1 py-1 px-2 bg-gray-100 text-xs dark:bg-gray-500"
                        >
                          {t}
                        </small>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Resume;
