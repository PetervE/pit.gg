import "../../components/configure";
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { Auth, Storage } from "aws-amplify";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { en } from "date-fns/locale";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { randomHue } from "../../components/constants";
import NivoBar from "../../components/NivoBar";

export default function Admin(props) {
  const { setStore, darkModeActive, gymLogs, user } = props;

  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  const [sets, setSets] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const loggedUser = await Auth.currentAuthenticatedUser();
    console.log(loggedUser);
    if (loggedUser && !user) setStore({ key: "user", value: loggedUser });

    const setsList = gymLogs.workouts.reduce((memo, w) => {
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
      const operation = await Storage.put(`fitness/videos/${file.name}`, file, {
        progressCallback(progress) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
        // contentType: 'image/png',
      });
      console.log(operation);
    } catch (err) {
      console.log("uploadMedia", err);
    }
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }
  console.log("admin page", props);
  return (
    <AmplifyAuthenticator className="flex flex-1 flex-col items-center justify-center">
      <div className="mt-10">
        <div className="flex w-full items-center justify-center bg-grey-lighter">
          <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-200">
            <svg
              className="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input type="file" className="hidden" onChange={uploadMedia} />
          </label>
        </div>
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
                  <td className="border px-8 py-4"></td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </AmplifyAuthenticator>
  );
}
