import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import { Auth, Storage } from "aws-amplify";

const Loader = dynamic(
  () => import("../components/Loader"),
  { ssr: false }
);

export default function Home(props) {
  const {
    setStore,
    darkModeActive,
    blogPosts,
    user,
    weightliftingLogs,
    weightliftingVideos,
  } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      if (weightliftingLogs === false) {
        const raw = await fetch("/api/amplify/fitness/logs");
        const data = await raw.json();
        setStore({ key: "weightliftingLogs", value: data });
      }

      if (weightliftingVideos === false) {
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
        setStore({ key: "weightliftingVideos", value: downloadedVideos });
      }

      if (blogPosts === false) {
        const postsRaw = await fetch("https://api.hashnode.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.hashnode,
          },
          body: JSON.stringify({
            query: `query {
              user(username:"petervanegeraat") {
                publication {
                  posts (page:0) {
                    cuid
                    slug
                    title
                    type
                    popularity
                    dateAdded
                    dateUpdated
                    dateFeatured
                    brief
                    coverImage
                    contentMarkdown
                  }
                }
              }
            }`,
          }),
        });
        const posts = await postsRaw.json();
        if (posts && posts.data) {
          setStore({
            key: "blogPosts",
            value: posts.data.user.publication.posts,
          });
        }
      }

      setLoading(false);
    } catch (err) {
      console.log("init app error", err);
    }
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }
  console.log("home", props);
  return (
    <div className="flex flex-1 flex-col justify-center items-stretch flex-col py-2 sm:px-10 px-5">
      <div className="flex flex-wrap flex-col items-start">
        {weightliftingLogs.workouts
          .sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
          .map((w) => {
            const date = formatDistance(new Date(w.date), new Date(), {
              addSuffix: true,
            });

            return (
              <div
                key={w.id}
                className="flex flex-wrap flex-col justify-start items-start mb-5"
              >
                <h1 className="dark:text-white text-black py-3">{date}</h1>
                <div className="flex flex-wrap">
                  {w.exercises.map((e) => {
                    return (
                      <label
                        key={e.id}
                        className="bg-gray-200 mr-1 mb-1 px-1 py-1 text-xs"
                      >
                        {e.type.replaceAll("-", " ")}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
