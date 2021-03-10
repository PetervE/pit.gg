import Head from "next/head";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Storage } from "aws-amplify";
import format from "date-fns/format";
import Toggle from "react-toggle";
import { IconContext } from "react-icons";
import { FaMoon, FaSun, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { randomHue } from "../components/constants";

import NivoLine from "../components/NivoLine";
import NivoBar from "../components/NivoBar";

const WORK_HISTORY = [
  {
    name: "Fearless Apps",
    website: "http://fearless.gg",
    begin_date: "7-1-2017",
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
        website: "https://aws.amazon.com/amplify/",
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
    begin_date: "3-1-2020",
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
    begin_date: "8-1-2018",
    end_date: "2-1-2020",
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
    begin_date: "12-1-2017",
    end_date: "7-1-2019",
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
    begin_date: "12-1-2015",
    end_date: "6-1-2017",
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
    begin_date: "2-1-2014",
    end_date: "6-1-2014",
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
    begin_date: "7-1-2011",
    end_date: "3-1-2012",
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

export default function Home() {
  const [darkModeActive, setDarkModeActive] = useState(true);

  useEffect(() => {
    checkLocalStorage();
    return () => {};
  }, []);

  const checkLocalStorage = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    }
  };

  const toggleColorMode = () => {
    if (localStorage.theme === "light") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setDarkModeActive(true);
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setDarkModeActive(false);
    }
  };

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
            <img src="/peter.jpg" alt="Peter" height="150" width="150" />
          </div>
          <h1 className="dark:text-white text-3xl font-display pb-2">About</h1>
          <p className="dark:text-white text-m font-sans max-w-lg leading-8">
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
        <div className="flex justify-start flex-col sm:px-10 px-5 py-2">
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
              let beginDate = format(new Date(work.begin_date), "LLLL yyyy");
              let endDate = work.end_date ? new Date(work.end_date) : false;
              if (endDate) endDate = format(endDate, "LLLL yyyy");
              return (
                <div
                  key={`work-${i}`}
                  className="border-l-2 pl-5 border-gray-800 dark:border-white mb-10"
                >
                  <h1 className="font-semibold dark:text-white">{work.name}</h1>
                  <p className="">
                    <small className="dark:text-white">{beginDate}</small>
                    <small className="dark:text-white"> - </small>
                    <small className="dark:text-white">
                      {endDate ? endDate : "now"}
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
        </div>
      </div>
    </div>
  );
}
