// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const webpackCli=require("webpack-cli")
const webpack=require("webpack")



const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  target:"node"
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
