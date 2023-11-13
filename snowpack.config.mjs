/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
  ],
  optimize: {
    "bundle": true
  },
  buildOptions: {
    out: 'build'
  },
};
