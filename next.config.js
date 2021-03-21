const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    optimizedImages,
    {
      // opti
    },
  ],
  {
    env: {
      hashnode: "dbdf0a3f-10ef-4132-ba30-aab14e5be6a5",
      twitter:
        "AAAAAAAAAAAAAAAAAAAAABFbNwEAAAAAbYR3%2FVtD1cKY1WjW79MTiFRlP64%3DlWJDWK92D57Y2yahC5RJLtZMgr8FZAzTwrXuC1bUw3wqcvsVBm",
    },
  }
);
