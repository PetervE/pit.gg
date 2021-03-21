const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
    },
  ],
]);

module.exports = withPlugins([optimizedImages, {}], {
  env: {
    hashnode: "dbdf0a3f-10ef-4132-ba30-aab14e5be6a5",
  },
});
