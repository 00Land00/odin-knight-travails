const path = require("path");

module.exports = {
  entry: "./src/js/index.js",
  resolve: {
    alias: {
      js: path.resolve(__dirname, "src/js"),
    },
  },
};
