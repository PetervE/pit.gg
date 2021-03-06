import Head from "next/head";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Storage } from "aws-amplify";
import { ResponsiveLine } from "@nivo/line";

export default function Home() {
  const [darkModeActive, setDarkModeActive] = useState(true);
  const [workouts, setWorkouts] = useState(false);
  const [exercises, setExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(false);

  const [workoutData, setWorkoutData] = useState([]);


  function randomRgbaString (alpha) {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    let a = alpha
    return `rgba(${r},${g},${b},${a})`
  }

  const toggleColorMode = () => {
    console.log("current", localStorage.theme);
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

  useEffect(() => {
    checkLocalStorage();
    getLiftLogs();
    return () => {};
  }, []);

  useEffect(() => {
    if (workouts) drawGraph();
  }, [activeExercise]);

  // get workouts, excercises and set active exercise
  const getLiftLogs = async () => {
    try {
      const logs = await Storage.get("logs/fithero-backup-2021-03-05.json", {
        download: true,
      });
      const value = await new Response(logs.Body).json();
      setWorkouts(value.workouts || []);

      const final = value.workouts.reduce((memo, workout) => {
        workout.exercises.map((e) => {
          memo[e.type] = memo[e.type] || [];
          memo[e.type].push(e);
        });
        return memo;
      }, {});
      setExercises(final);

      let active = Object.keys(final)[0];
      setActiveExercise({ value: active, label: active.replaceAll("-", " ") });
    } catch (err) {
      console.log(err);
    }
  };

  const drawGraph = () => {
    console.log(workouts);
    console.log(exercises);

    let final = workouts.reduce((memo, e) => {

    }, [])

    setWorkoutData([
      {
        id: "japan",
        color: "hsl(0, 0%, 80%)",
        data: [
          {
            x: "plane",
            y: 0,
          },
          {
            x: "helicopter",
            y: 0,
          },
          {
            x: "boat",
            y: 248,
          },
          {
            x: "train",
            y: 57,
          },
          {
            x: "subway",
            y: 289,
          },
          {
            x: "bus",
            y: 133,
          },
          {
            x: "car",
            y: 146,
          },
          {
            x: "moto",
            y: 86,
          },
          {
            x: "bicycle",
            y: 232,
          },
          {
            x: "horse",
            y: 147,
          },
          {
            x: "skateboard",
            y: 290,
          },
          {
            x: "others",
            y: 178,
          },
        ],
      },
    ]);
  };

  const changeExercise = (e) => {
    setActiveExercise(e);
  };

  if (!exercises || !activeExercise) return null;

  return (
    <div className="flex flex-wrap flex-col bg-white dark:bg-gray-800">
      <Head>
        <title>Peter van Egeraat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="flex flex-grow-0 bg-blue-400 dark:bg-red-400">
        <button onClick={toggleColorMode}>Toggle</button>
      </nav>
      <header className="flex flex-grow-0 justify-center">
        <div className="w-96 m-8">
          <Select
            value={activeExercise}
            onChange={changeExercise}
            options={Object.keys(exercises).reduce((memo, e) => {
              memo.push({ value: e, label: e.replaceAll("-", " ") });
              return memo;
            }, [])}
          />
        </div>
      </header>
      <div className="h-screen flex flex-col flex-wrap justify-start content-center">
        <div className="flex flex-wrap w-full h-2/4">
          <ResponsiveLine
            colors={[randomRgbaString(1)]}
            colors={{ scheme: "accent" }}
            data={workoutData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            theme={{
              legends: {
                text: { fill: darkModeActive ? "white" : "black" },
              },
              axis: {
                legend: { text: { fill: darkModeActive ? "white" : "black" } },
                ticks: {
                  line: {
                    stroke: "green",
                  },
                  text: {
                    fill: darkModeActive ? "white" : "black",
                  },
                },
              },
              grid: {
                line: {
                  stroke: darkModeActive ? "white" : "black",
                  strokeWidth: 1,
                  strokeDasharray: "0 0",
                },
              },
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "transportation",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "count",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
