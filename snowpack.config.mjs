/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
  },
  plugins: [
  ],
  routes: [
    { "src": ".*", "dest": "client/index.html" },
  ],
  optimize: {
    "bundle": true
  },
  packageOptions: {
  },
  devOptions: {
  },
  buildOptions: {
    out: 'build'
  },
};
