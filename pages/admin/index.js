import "../../components/configure";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Auth, Storage } from "aws-amplify";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { en } from "date-fns/locale";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Loader from "../../components/Loader";
import { randomHue } from "../../components/constants";
import NivoBar from "../../components/NivoBar";

export default function Admin(props) {
  const {
    setStore,
    darkModeActive,
    user,
    weightliftingLogs,
    weightliftingVideos,
  } = props;

  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  const [videos, setVideos] = useState(false);
  const [setPicked, setSetPicked] = useState(false);

  const [url, setUrl] = useState(false);

  const [sets, setSets] = useState(false);

  useEffect(() => {
    checkUser();
    init();
  }, []);

  const checkUser = async () => {
    try {
      const loggedUser = await Auth.currentAuthenticatedUser();
      setStore({ key: "user", value: loggedUser || false });
    } catch (err) {
      setStore({ key: "user", value: false });
    }
  };

  function processStorageList(result) {
    let files = [];
    let folders = new Set();
    result.forEach((res) => {
      if (res.size) {
        files.push(res);
        // sometimes files declare a folder with a / within then
        let possibleFolder = res.key.split("/").slice(0, -1).join("/");
        if (possibleFolder) folders.add(possibleFolder);
      } else {
        folders.add(res.key);
      }
    });
    return { files, folders };
  }

  const init = async () => {
    const setsList = weightliftingLogs.workouts.reduce((memo, w) => {
      let exers = [];
      w.exercises.map(({ sets }) => {
        exers.push(...sets);
      });
      memo.push(...exers);
      return memo;
    }, []);
    setSets(setsList);
    setLoading(false);
  };

  const uploadMedia = async (e) => {
    try {
      e.preventDefault();
      const file = e.target.files[0];
      let metadata = {};
      metadata["set-id"] = setPicked.id;

      const operation = await Storage.put(`fitness/videos/${file.name}`, file, {
        metadata: metadata,
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
        // contentType: 'image/png',
      });
      init();
    } catch (err) {
      console.log("uploadMedia", err);
    }
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <AmplifyAuthenticator className="flex flex-1 flex-col items-center justify-center px-5">
      <div className="mt-10">
        <label
          className={`w-64 flex flex-col items-center px-4 py-6 text-blue rounded-lg  tracking-wide uppercase border border-blue cursor-pointer dark:bg-white bg-green-200 ${
            setPicked
              ? "hover:text-gray-200 bg-opacity-100 shadow-lg"
              : "bg-opacity-10"
          }`}
        >
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            disabled={!setPicked}
            type="file"
            className="hidden"
            onChange={uploadMedia}
          />
        </label>
      </div>
      <div>
        <ReactPlayer
          controls={true}
          playing={false}
          loop={false}
          url={weightliftingVideos[0].S3URL}
        />
      </div>
      <table className="shadow-lg bg-white mt-10">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Date</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Exercise</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Weight</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Reps</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sets
            .sort((a, b) => {
              return new Date(b.date) - new Date(a.date);
            })
            .map((s) => {
              let date = formatDistance(
                new Date(s.date),
                new Date(),
                { locale: en } // Pass the locale as an option
              );

              date = format(new Date(s.date), "do LLLL", { locale: en });

              return (
                <tr key={s.id}>
                  <td className="border px-8 py-4">{date}</td>
                  <td className="border px-8 py-4">{s.id}</td>
                  <td className="border px-8 py-4">{s.weight}</td>
                  <td className="border px-8 py-4">{s.reps}</td>
                  <td className="border px-8 py-4">
                    <button onClick={() => setSetPicked(setPicked ? false : s)}>
                      {setPicked && setPicked.id === s.id
                        ? "Deselect"
                        : "Select"}
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </AmplifyAuthenticator>
  );
}
