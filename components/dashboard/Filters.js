import Toggle from "react-toggle";

import { IconContext } from "react-icons";
import { FaTrophy, FaTwitter } from "react-icons/fa";
import { CgGym } from "react-icons/cg";

function Filters(props) {
  const {
    darkModeActive,
    tweetsActive,
    postsActive,
    projectsActive,
    educationActive,
    setEducationActive,
    employersActive,
    setTweetsActive,
    setPostsActive,
    setProjectsActive,
    setEmployersActive,
    weightliftingLogsActive,
    setWeightliftingLogsActive,
  } = props;

  console.log("filters", props);

  return (
    <div className="flex flex-row flex-1 justify-center bg-gray-900 mb-10 py-5">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-0">
          <IconContext.Provider
            value={{ color: darkModeActive ? "#fbbf24" : "#CCCCCC" }}
          >
            <FaTrophy size={30} />
          </IconContext.Provider>
        </div>
        <h1 className="flex flex-0 text-base text-black dark:text-white">
          Career
        </h1>
        <div className="flex flex-0">
          <Toggle
            disabled={true}
            icons={false}
            defaultChecked={
              employersActive && projectsActive && educationActive
            }
            onChange={() => {
              setEmployersActive(!employersActive);
              setProjectsActive(!projectsActive);
              setEducationActive(!educationActive);
            }}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-0">
          <IconContext.Provider
            value={{ color: darkModeActive ? "#fbbf24" : "#CCCCCC" }}
          >
            <FaTwitter size={30} />
          </IconContext.Provider>
        </div>
        <h1 className="flex flex-0 text-base text-black dark:text-white">
          Social
        </h1>
        <div className="flex flex-0">
          <Toggle
            icons={false}
            defaultChecked={employersActive && projectsActive}
            onChange={() => {
              setTweetsActive(!tweetsActive);
              setPostsActive(!postsActive);
            }}
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-0">
          <IconContext.Provider
            value={{ color: darkModeActive ? "#fbbf24" : "#CCCCCC" }}
          >
            <CgGym size={30} />
          </IconContext.Provider>
        </div>
        <h1 className="flex flex-0 text-base text-black dark:text-white">
          Fitness
        </h1>
        <div className="flex flex-0">
          <Toggle
            icons={false}
            defaultChecked={employersActive && projectsActive}
            onChange={() => {
              setWeightliftingLogsActive(!weightliftingLogsActive);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
