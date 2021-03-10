import Head from "next/head";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Storage } from "aws-amplify";
import { format, parseISO, toDate } from "date-fns";
import nl from "date-fns/locale/nl";
import Toggle from "react-toggle";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { randomHue } from "../components/constants";

import NivoLine from "../components/NivoLine";
import NivoBar from "../components/NivoBar";

import img from "../public/peter.jpg";

const WORK_HISTORY = [
  {
    name: "Fearless Apps",
    website: "http://fearless.gg",
    begin_date: new Date("2017/7/1"),
    end_date: false,
    position: "Co-founder",
    languages: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Swift",
      "Kotlin",
      "Objective-C",
      "Java",
      "CocoaPods",
      "Gradle",
      "NodeJS",
      "GraphQL",
      "AWS S3",
      "AWS DynamoDB",
      "AWS Cognito",
      "AWS Lambda",
    ],
    technologies: [
      {
        name: "React",
        website: "https://reactjs.org",
      },
      {
        name: "NextJS",
        website: "https://nextjs.org/",
      },
      {
        name: "React Native",
        website: "https://reactnative.dev",
      },
      {
        name: "Expo",
        website: "https://expo.io/",
      },
      {
        name: "AWS Amplify",
        website: "https://aws.amazon.com/amplify/",
      },
      {
        name: "Tailwind",
        website: "https://tailwindcss.com/",
      },
      {
        name: "Photoshop",
        website: "https://adobe.com",
      },
      {
        name: "Illustrator",
        website: "https://adobe.com",
      },
      {
        name: "InDesign",
        website: "https://adobe.com",
      },
      {
        name: "Sketch",
        website: "https://www.sketch.com/",
      },
    ],
  },
  {
    name: "Purple Creative Innovators",
    website: "https://purple.nl",
    begin_date: new Date("2020/3/1"),
    end_date: false,
    position: "React Native Developer",
    languages: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Swift",
      "Kotlin",
      "Objective-C",
      "Java",
      "CocoaPods",
      "Gradle",
      "NodeJS",
      "GraphQL",
      "AWS S3",
      "AWS DynamoDB",
      "AWS Cognito",
      "AWS Lambda",
    ],
    technologies: [
      {
        name: "React",
        website: "https://reactjs.org",
      },
      {
        name: "NextJS",
        website: "https://nextjs.org/",
      },
      {
        name: "React Native",
        website: "https://reactnative.dev",
      },
      {
        name: "Expo",
        website: "https://expo.io/",
      },
      {
        name: "AWS Amplify",
        website: "https://aws.amazon.com/amplify/",
      },
      {
        name: "ExpressJS",
        website: "https://expressjs.com/",
      },
      {
        name: "Tailwind",
        website: "https://aws.amazon.com/amplify/",
      },
      {
        name: "Sketch",
        website: "https://www.sketch.com/",
      },
    ],
  },
  {
    name: "Holland Financial Business Group",
    website: "https://hfbg.nl",
    begin_date: new Date("2018/8/1"),
    end_date: new Date("2020/2/1"),
    position: "React Native Developer",
    languages: [
      "HTML",
      "CSS",
      "JavaScript",
      "Swift",
      "Kotlin",
      "Objective-C",
      "Java",
      "CocoaPods",
      "Gradle",
    ],
    technologies: [
      {
        name: "React",
        website: "https://reactjs.org",
      },
      {
        name: "React Native",
        website: "https://reactnative.dev",
      },
      {
        name: "Emotion",
        website: "https://emotion.sh/",
      },
      {
        name: "Sketch",
        website: "https://www.sketch.com/",
      },
    ],
  },
  {
    name: "SkillsTown",
    website: "https://skillstown.nl",
    begin_date: new Date("2017/12/1"),
    end_date: new Date("2019/7/1"),
    position: "React Native Developer",
    languages: [
      "HTML",
      "CSS",
      "JavaScript",
      "Swift",
      "Kotlin",
      "Objective-C",
      "Java",
      "CocoaPods",
      "Gradle",
    ],
    technologies: [
      {
        name: "React",
        website: "https://reactjs.org",
      },
      {
        name: "React Native",
        website: "https://reactnative.dev",
      },
      {
        name: "Styled Components",
        website: "https://styled-components.com/",
      },
    ],
  },
  {
    name: "Software Skills",
    website: "https://softwareskills.se",
    begin_date: new Date("2015/12/1"),
    end_date: new Date("2017/6/1"),
    position: "Webdeveloper",
    languages: ["HTML", "CSS", "JavaScript"],
    technologies: [
      {
        name: "Angular",
        website: "https://angularjs.org",
      },
    ],
  },
  {
    name: "Tim online",
    website: "https://tim-online.nl/",
    begin_date: new Date("2014/2/1"),
    end_date: new Date("2014/6/1"),
    position: "Intern Webdeveloper",
    languages: ["HTML", "CSS", "JavaScript"],
    technologies: [
      {
        name: "Angular",
        website: "https://angularjs.org",
      },
    ],
  },
  {
    name: "Dutch Didit",
    website: false,
    begin_date: new Date("2011/7/1"),
    end_date: new Date("2012/3/1"),
    position: "Multimedia designer",
    languages: false,
    technologies: [
      {
        name: "Photoshop",
        website: "https://adobe.com",
      },
      {
        name: "Illustrator",
        website: "https://adobe.com",
      },
      {
        name: "InDesign",
        website: "https://adobe.com",
      },
    ],
  },
];

const EDUCATION = [
  {
    name: "HBO: Communication & Multimedia Design ",
    description: "",
    website:
      "https://www.avans.nl/opleidingen/opleidingzoeker/communication--multimedia-design-breda-voltijd-bachelor/introductie",
    begin_date: new Date("2012/8/1"),
    end_date: new Date("2017/1/1"),
  },
  {
    name: "NTI: Desktop Publishing",
    description: "",
    website:
      "https://www.nti.nl/beroepsopleidingen/ict-opleidingen/desktop-publishing-dtp/",
    begin_date: new Date("2011/2/1"),
    end_date: new Date("2011/7/1"),
  },
];

const PROJECTS = [
  {
    name: "Wereldhonden",
    description: "",
    github: "https://github.com/PetervE/Wereldhonden",
    website: "https://wereldhonden.nl",
    languages: [
      "HTML",
      "CSS",
      "JavaScript",
      "CocoaPods",
      "Gradle",
      "NodeJS",
      "GraphQL",
      "AWS S3",
      "AWS DynamoDB",
      "AWS Cognito",
      "AWS Lambda",
    ],
    technologies: [
      {
        name: "React",
        website: "https://reactjs.org",
      },
      {
        name: "React Native",
        website: "https://reactnative.dev",
      },
      {
        name: "AWS Amplify",
        website: "https://aws.amazon.com/amplify/",
      },
      {
        name: "Sketch",
        website: "https://www.sketch.com/",
      },
    ],
  },
  {
    name: "Portfolio",
    description: "",
    github: "https://github.com/PetervE/pit.gg",
    website: "https://pit.gg",
    languages: [
      "HTML",
      "CSS",
      "JavaScript",
      "AWS S3",
      "AWS DynamoDB",
      "AWS Cognito",
      "AWS Lambda",
    ],
    technologies: [
      {
        name: "React",
        website: "https://reactjs.org",
      },
      {
        name: "NextJS",
        website: "https://nextjs.org/",
      },
      {
        name: "AWS Amplify",
        website: "https://aws.amazon.com/amplify/",
      },
      {
        name: "Sketch",
        website: "https://www.sketch.com/",
      },
    ],
  },
];

export default function Home() {
  const [darkModeActive, setDarkModeActive] = useState(null);

  useEffect(() => {
    checkLocalStorage();
    return () => {};
  }, []);

  const checkLocalStorage = () => {
    let status = localStorage.getItem("theme");
    console.log(status);
    if (status === "light") {
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    } else {
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    }
  };

  const toggleColorMode = () => {
    if (darkModeActive) {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    } else {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    }
  };

  if (darkModeActive === null) return null;

  return (
    <div className="min-h-screen flex flex-1 flex-col dark:bg-white dark:bg-gray-800">
      <Head>
        <title>Peter van Egeraat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-grow-0 bg-white dark:bg-gray-600 justify-end sm:py-10 py-5">
        <div className="flex flex-1">
          <h1 className="dark:text-white text-xl font-mono sm:px-10 px-5">
            Peter van Egeraat
          </h1>
        </div>
        <div className="flex flex-0 sm:px-10 px-5">
          <Toggle
            className="h-5"
            defaultChecked={darkModeActive}
            icons={{
              checked: (
                <IconContext.Provider value={{ color: "white" }}>
                  <div className="h-5">
                    <FaMoon />
                  </div>
                </IconContext.Provider>
              ),
              unchecked: (
                <IconContext.Provider value={{ color: "#fbbf24" }}>
                  <div className="h-5">
                    <FaSun />
                  </div>
                </IconContext.Provider>
              ),
            }}
            onChange={toggleColorMode}
          />
        </div>
      </nav>

      <div className="flex flex-1 justify-start align-center flex-col">
        <div className="flex justify-start flex-col sm:px-10 px-5 pb-2">
          <div className="flex py-5">
            <img
              src={img}
              alt="Peter"
              height="150"
              width="150"
              style={{ height: 150, width: 150 }}
            />
          </div>
          <h1 className="dark:text-white text-3xl font-display pb-2">About</h1>
          <p className="dark:text-white text-m font-sans max-w-3xl leading-8">
            I use React and React Native to develop applications for Web, iOS
            and Android. Designing new products in Sketch and Adobe software is
            also something I enjoy. In my free time you can find me in the gym
            or spending time with members of my{" "}
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
        <div className="flex justify-start flex-col sm:px-10 px-5 py-2 max-w-3xl">
          <IconContext.Provider
            value={{ color: darkModeActive ? "#fbbf24" : "#CCCCCC" }}
          >
            <div className="flex flex-wrap flex-row justify-evenly py-5">
              <a
                className="flex"
                target="_blank"
                href="https://github.com/PetervE"
              >
                <FaGithub size={50} />
              </a>
              <a
                className="flex"
                target="_blank"
                href="https://www.linkedin.com/in/petervanegeraat/"
              >
                <FaLinkedin size={50} />
              </a>
              <a
                className="flex"
                target="_blank"
                href="https://twitter.com/petervanegeraat"
              >
                <FaTwitter size={50} />
              </a>
            </div>
          </IconContext.Provider>
        </div>
        <div className="flex justify-start flex-col sm:px-10 px-5 py-2">
          <h1 className="dark:text-white text-3xl font-display pb-2 mb-5">
            Work history
          </h1>
          <div className="">
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
                      className="font-medium dark:text-white text-xl my-0 underline"
                    >
                      {work.name}
                    </a>
                  ) : (
                    <span
                      target="_blank"
                      className="font-semibold dark:text-white text-xl my-0"
                    >
                      {work.name}
                    </span>
                  )}
                  <p className="my-1">
                    <small className="font-light dark:text-gray-300 text-sm mr-2">
                      {work.position}
                    </small>
                    <small className="dark:text-gray-500">
                      ({`${format(work.begin_date, "LLLL yyyy")}`}
                    </small>
                    <small className="dark:text-gray-500"> - </small>
                    <small className="dark:text-gray-500">
                      {`${
                        work.end_date
                          ? format(work.end_date, "LLLL yyyy")
                          : "now"
                      }`}
                      )
                    </small>
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
              {EDUCATION.map((work, i) => {
                return (
                  <div
                    key={`work-${i}`}
                    className="border-l-2 pl-5 border-gray-800 dark:border-white mb-10"
                  >
                    <h1 className="font-semibold dark:text-white">
                      {work.name}
                    </h1>
                    <p className="">
                      <small className="dark:text-white">
                        {`${format(work.begin_date, "LLLL yyyy")}`}
                      </small>
                      <small className="dark:text-white"> - </small>
                      <small className="dark:text-white">
                        {`${
                          work.end_date
                            ? format(work.end_date, "LLLL yyyy")
                            : "now"
                        }`}
                      </small>
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
                    className="border-l-2 pl-5 border-gray-800 dark:border-white mb-10"
                  >
                    <div className="flex flex-wrap">
                      <h1 className="font-semibold dark:text-white">
                        {project.name}
                      </h1>

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
      </div>
    </div>
  );
}
