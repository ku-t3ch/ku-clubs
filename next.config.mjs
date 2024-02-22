await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["@mdxeditor/editor"],
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true
    return config;
  },
};
export default config;
