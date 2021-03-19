import { format, formatDistance, formatRelative, subDays } from "date-fns";
import Select from "react-select";

import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { randomHue } from "../../components/constants";
import NivoBar from "../../components/NivoBar";

export default function Fitness({ darkModeActive }) {
  const [workouts, setWorkouts] = useState(false);
  const [exercises, setExercises] = useState(false);
  const [activeExercise, setActiveExercise] = useState(false);
  const [loading, setLoading] = useState(true);

  const [workoutData, setWorkoutData] = useState([]);

  function randomRgbaString(alpha) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let a = alpha;
    return `rgba(${r},${g},${b},${a})`;
  }

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const raw = await fetch("/api/amplify/fitness");
    const data = await raw.json();
    const { workouts } = data;
    setWorkouts(workouts);

    const exerciseList = workouts.reduce((memo, workout) => {
      workout.exercises.map((e) => {
        memo[e.type] = memo[e.type] || [];
        memo[e.type].push(e);
      });
      return memo;
    }, {});
    setExercises(exerciseList);

    let active = Object.keys(exerciseList)[0];
    setActiveExercise({
      value: active,
      label: active.replaceAll("-", " "),
    });
  };

  useEffect(() => {
    if (workouts) drawGraph();
  }, [activeExercise]);

  const drawGraph = () => {
    let colors = {
      set1Color: false,
      set2Color: false,
      set3Color: false,
      set4Color: false,
      set5Color: false,
      set6Color: false,
      set7Color: false,
      set8Color: false,
      set9Color: false,
      set10Color: false,
    };

    let workoutList = workouts.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

    let final = workoutList.reduce((memo, workout) => {
      let find = workout.exercises.find((e) => e.type === activeExercise.value);
      if (find) {
        const payload = {
          date: formatRelative(new Date(workout.date), new Date()),
        };

        find.sets.map((e, i) => {
          const numberId = `set ${String(i++)}`;
          const colorId = `set${String(i++)}Color`;

          let colorExists = colors[colorId] !== false;
          if (!colorExists) {
            colors[colorId] = `hsl(${randomHue()}, 70%, 50%)`;
          }

          payload[numberId] = e.reps * e.weight;

          payload[colorId] = colors[colorId];
        });

        memo.push(payload);
      }
      return memo;
    }, []);

    setWorkoutData(final);
    setLoading(false);
  };

  const changeExercise = (e) => {
    setActiveExercise(e);
  };

  if (loading) {
    return <Loader fullscreen={true} darkModeActive={darkModeActive} />;
  }

  return (
    <div>
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
      <section className="h-screen flex flex-col flex-wrap justify-start content-center">
        <div className="flex flex-wrap w-full h-2/4">
          {/* <NivoLine darkModeActive={darkModeActive} data={workoutData} /> */}
          <NivoBar darkModeActive={darkModeActive} data={workoutData} />
        </div>
      </section>
    </div>
  );
}
