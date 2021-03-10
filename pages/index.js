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
    description:
      "Fullstack application development company (VOF) founded by Luuk & Peter van Egeraat.",
    website: "http://fearless.gg/apps",
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
      // {
      //   name: "Photoshop",
      //   website: "https://adobe.com",
      // },
      // {
      //   name: "Illustrator",
      //   website: "https://adobe.com",
      // },
      // {
      //   name: "InDesign",
      //   website: "https://adobe.com",
      // },
      // {
      //   name: "Sketch",
      //   website: "https://www.sketch.com/",
      // },
    ],
  },
  {
    name: "Purple Creative Innovators",
    description:
      "Maintaining two applications in production on App store and Google Play. Building applications to automate internal processes.",
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
      "SQL",
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
        website: "https://tailwindcss.com/",
      },
    ],
  },
  {
    name: "Holland Financial Business Group",
    description:
      "Worked on building a Multifactor Authentication app to improve the security of their products.",
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
    ],
  },
  {
    name: "SkillsTown",
    description: "Worked on camera and video applications.",
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
    description:
      "Worked (including abroad for 3 months) on a web tool for applicants and companies to make the hiring process easier and more efficient by providing tests.",
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
    description:
      "I started with programming at Tim online by developing a paralax website and a puzzle game.",
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
    description:
      "I designed the visuals of a predication game with leader boards, monthly prizes, scores, questions and answers. This app was later sold to a leading Dutch news paper.",
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
    description:
      "A broad study that covers all kinds of media and research techniques. I've gained a lot of experience by doing presentations, research and delivering products.",
    website:
      "https://www.avans.nl/opleidingen/opleidingzoeker/communication--multimedia-design-breda-voltijd-bachelor/introductie",
    begin_date: new Date("2012/8/1"),
    end_date: new Date("2017/1/1"),
  },
  {
    name: "NTI: Desktop Publishing",
    description:
      "This course taught me to work with Adobe software Photoshop, Illustrator, InDesign. I've been using Adobe ever since and picked up Sketch along the way.",
    website:
      "https://www.nti.nl/beroepsopleidingen/ict-opleidingen/desktop-publishing-dtp/",
    begin_date: new Date("2011/2/1"),
    end_date: new Date("2011/7/1"),
  },
];

const PROJECTS = [
  {
    name: "Wereldhonden",
    description:
      "Working on a native application to help stray dogs find a responsible human that takes care of them.",
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
    ],
  },
  {
    name: "pit.gg",
    description: "This website.",
    github: "https://github.com/PetervE/pit.gg",
    website: "https://pit.gg",
    languages: ["HTML", "CSS", "JavaScript"],
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
        name: "Tailwind",
        website: "https://tailwindcss.com/",
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
    <div className="min-h-screen flex flex-1 flex-col bg-white dark:bg-white dark:bg-gray-800">
      <Head>
        <title>Peter van Egeraat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex flex-grow-0 bg-gray-100 dark:bg-gray-600 justify-end py-5">
        <div className="flex flex-0 flex-col sm:px-10 pl-5 pr-3">
          <h1 className="dark:text-white text-2xl font-display">
            Peter van Egeraat
          </h1>
          <span className="dark:text-white text-l font-body">
            Software Engineer
          </span>
        </div>
        <div className="flex flex-1 sm:px-10 justify-center align-center items-center">
          <div className="flex flex-shrink">
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
        </div>
      </nav>

      <div className="flex flex-1 justify-start align-center flex-col py-2">
        <div className="flex justify-start flex-col sm:px-10 px-5 pb-4">
          <div className="flex py-5 flex-wrap flex-row">
            <img
              src={img}
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
          <h1 className="dark:text-white text-3xl font-display pb-2 mb-5">
            About
          </h1>
          <div>
            <div className="border-l-2 pl-5 border-gray-800 dark:border-gray-400">
              <p className="dark:text-white text-base font-sans max-w-3xl leading-8">
                I use React and React Native to develop applications for Web,
                iOS and Android. Designing new products in Sketch and Adobe
                software is also something I enjoy. In my free time you can find
                me in the gym or spending time with members of my{" "}
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

        <div className="flex justify-start flex-col sm:px-10 px-5 py-2 mt-5">
          <div className="">
            <h1 className="dark:text-white text-3xl font-display pb-2 mb-5">
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
                    <small>{`${format(work.begin_date, "LLLL yyyy")}`}</small>
                    {work.end_date ? (
                      <small className="px-1">{` - `}</small>
                    ) : null}
                    <small>
                      {work.end_date
                        ? `${format(work.end_date, "LLLL yyyy")}`
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
                        education.begin_date,
                        "LLLL yyyy"
                      )}`}</small>
                      {education.end_date ? (
                        <small className="px-1">{` - `}</small>
                      ) : null}
                      <small>
                        {education.end_date
                          ? `${format(education.end_date, "LLLL yyyy")}`
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
      </div>
    </div>
  );
}
