import Toggle from "react-toggle";

function Filters(props) {
  const {
    tweetsActive,
    postsActive,
    projectsActive,
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
    <div className="flex flex-row flex-1 justify-evenly">
      <div className="flex flex-col items-stretch">
        <h1 className="text-2xl text-black dark:text-white">Development</h1>
        <div className="flex items-center h-12">
          <small className="text-sm text-black dark:text-white w-20">
            Projects
          </small>
          <div className="mt-1">
            <Toggle
              defaultChecked={projectsActive}
              onChange={() => setProjectsActive(!projectsActive)}
            />
          </div>
        </div>
        <div className="flex items-center h-12">
          <small className="text-sm text-black dark:text-white w-20">
            Employers
          </small>
          <div className="mt-1">
            <Toggle
              defaultChecked={projectsActive}
              onChange={() => setEmployersActive(!employersActive)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-stretch">
        <h1 className="text-2xl text-black dark:text-white">Social</h1>
        <div className="flex items-center h-12">
          <small className="text-sm text-black dark:text-white w-20">
            Blog posts
          </small>
          <div className="mt-1">
            <Toggle
              defaultChecked={postsActive}
              onChange={() => setPostsActive(!postsActive)}
            />
          </div>
        </div>
        <div className="flex items-center h-12">
          <small className="text-sm text-black dark:text-white w-20">
            Tweets
          </small>
          <div className="mt-1">
            <Toggle
              defaultChecked={tweetsActive}
              onChange={() => setTweetsActive(!tweetsActive)}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-stretch">
        <h1 className="text-2xl text-black dark:text-white">Fitness</h1>
        <div className="flex items-center h-12">
          <small className="text-sm text-black dark:text-white w-20">
            Lifting
          </small>
          <div className="mt-1">
            <Toggle
              defaultChecked={weightliftingLogsActive}
              onChange={() =>
                setWeightliftingLogsActive(!weightliftingLogsActive)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filters;
