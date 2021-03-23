import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { Auth, label, Storage } from "aws-amplify";

const Loader = dynamic(() => import("../components/Loader"), { ssr: false });

import PROJECTS from "../json/projects.json";
import EDUCATION from "../json/education.json";
import WORK_HISTORY from "../json/work.json";

import Tweet from "../components/dashboard/Tweet";
import Post from "../components/dashboard/Post";
import WeightliftingLog from "../components/dashboard/WeightliftingLog";
import Project from "../components/dashboard/Project";
import Employer from "../components/dashboard/Employer";
import Filters from "../components/dashboard/Filters";

export default function Home(props) {
  const {
    setStore,
    darkModeActive,
    blogPosts,
    user,
    weightliftingLogs,
    weightliftingVideos,
    tweets,
  } = props;
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  const [tweetsActive, setTweetsActive] = useState(true);
  const [postsActive, setPostsActive] = useState(true);
  const [projectsActive, setProjectsActive] = useState(true);
  const [employersActive, setEmployersActive] = useState(true);
  const [weightliftingLogsActive, setWeightliftingLogsActive] = useState(true);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    try {
      let promise1 = getWeightLiftingLogs();
      let promise2 = getWeightLiftingVideos();
      let promise3 = getBlogPosts();
      let promise4 = getTweets();

      Promise.all([promise1, promise2, promise3, promise4]).then((values) => {
        setLoading(false);
      });
    } catch (err) {
      console.log("init app error", err);
    }
  };

  const getWeightLiftingLogs = async () => {
    try {
      const raw = await fetch("/api/logs");
      let { data } = await raw.json();
      return setStore({ key: "weightliftingLogs", value: data });
    } catch (err) {
      console.log("getWeightLiftingLogs", err);
    }
  };

  const getWeightLiftingVideos = async () => {
    try {
      // const videosList = await Storage.list(`fitness/videos`);
      // let downloadedVideos = [];
      // videosList.map(async (v) => {
      //   let operation;
      //   if (v.size) {
      //     operation = await fetch(`/api/videos?id=${v.key}`);
      //     let data = await operation.json();
      //     if (data) downloadedVideos.push(data);
      //   }
      // });

      const videosList = await Storage.list("fitness/videos/");
      let downloadedVideos = [];
      await Promise.all(
        videosList.map(async (v) => {
          if (!v.size) return;
          const videoUrl = await Storage.get(v.key);
          const video = await Storage.get(v.key, {
            download: true,
            includeHeaders: true,
          });

          downloadedVideos.push({ ...video, S3URL: videoUrl });
        })
      );
      downloadedVideos = downloadedVideos.length ? downloadedVideos : false;
      return setStore({
        key: "weightliftingVideos",
        value: downloadedVideos,
      });
    } catch (err) {
      console.log("getWeightLiftingVideos", err);
    }
  };

  const getBlogPosts = async () => {
    try {
      const postsRaw = await fetch("/api/posts");
      const { data } = await postsRaw.json();
      return setStore({
        key: "blogPosts",
        value: data,
      });
    } catch (err) {
      console.log("getWeightLiftingVideos", err);
    }
  };

  const getTweets = async () => {
    try {
      const tweetsListRaw = await fetch("/api/tweets");
      let { data } = await tweetsListRaw.json();
      return setStore({
        key: "tweets",
        value: data,
      });
    } catch (err) {
      console.log("getTweets", err);
    }
  };

  const getDashboard = () => {
    let list = [];

    if (postsActive) {
      blogPosts.map((b) => {
        list.push({
          ...b,
          DASHBOARD_TYPE: "POST",
          DASHBOARD_DATE: new Date(b.dateAdded),
        });
      });
    }

    if (tweetsActive) {
      tweets.map((t) => {
        list.push({
          ...t,
          DASHBOARD_TYPE: "TWEET",
          DASHBOARD_DATE: new Date(t.created_at),
        });
      });
    }

    if (weightliftingLogsActive) {
      weightliftingLogs.workouts.map((w) => {
        list.push({
          ...w,
          DASHBOARD_TYPE: "WEIGHTLIFTING_LOG",
          DASHBOARD_DATE: new Date(w.date),
        });
      });
    }

    if (employersActive) {
      WORK_HISTORY.map((h) => {
        list.push({
          ...h,
          DASHBOARD_TYPE: "EMPLOYER",
          DASHBOARD_DATE: new Date(h.begin_date),
        });
      });
    }

    if (projectsActive) {
      PROJECTS.map((p) => {
        list.push({
          ...p,
          DASHBOARD_TYPE: "PROJECT",
          DASHBOARD_DATE: new Date(p.release_date),
        });
      });
    }

    list.sort((a, b) => {
      return b.DASHBOARD_DATE - a.DASHBOARD_DATE;
    });
    return list;
  };

  const renderDashboardItem = (item, index) => {
    const date = formatDistance(item.DASHBOARD_DATE, new Date(), {
      addSuffix: true,
    });
    const id = `item-${index}`;
    switch (item.DASHBOARD_TYPE) {
      case "TWEET":
        return <Tweet key={id} {...item} darkModeActive={darkModeActive} />;
      case "POST":
        return <Post key={id} {...item} darkModeActive={darkModeActive} />;

      case "WEIGHTLIFTING_LOG":
        return (
          <WeightliftingLog
            key={id}
            {...item}
            darkModeActive={darkModeActive}
          />
        );
      case "PROJECT":
        return <Project key={id} {...item} darkModeActive={darkModeActive} />;
      case "EMPLOYER":
        return <Employer key={id} {...item} darkModeActive={darkModeActive} />;

      default:
        return (
          <div key={id}>
            <small className="text-white">{item.DASHBOARD_TYPE}</small>
            <label className="text-white">{date}</label>
          </div>
        );
    }
  };

  if (loading || busy) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  const list = getDashboard();
  return (
    <div className="flex flex-1 flex-col justify-center items-stretch flex-col py-2 sm:px-10 px-5">
      <div className="flex flex-wrap flex-col items-stretch">
        <div className="flex flex-col items-stretch my-5">
          <div className="flex flex-row justify-start">
            <Filters
              tweetsActive={tweetsActive}
              postsActive={postsActive}
              projectsActive={projectsActive}
              employersActive={employersActive}
              setTweetsActive={setTweetsActive}
              setPostsActive={setPostsActive}
              setProjectsActive={setProjectsActive}
              setEmployersActive={setEmployersActive}
              weightliftingLogsActive={weightliftingLogsActive}
              setWeightliftingLogsActive={setWeightliftingLogsActive}
            />
          </div>
        </div>
        {list.map((x, i) => {
          return renderDashboardItem(x, i);
        })}
      </div>
    </div>
  );
}
