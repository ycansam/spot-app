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
    "bundle": true,
    'minify': true,
    'target': 'es2020',
  },
  devOptions: {
    'port': 3000,
    'open': 'none', 
  },
  buildOptions: {
    out: 'build'
  },
};
