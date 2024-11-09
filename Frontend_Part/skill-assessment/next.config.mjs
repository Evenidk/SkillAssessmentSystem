// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        fs: false,
        path: false,
        stream: false,
        crypto: false,
      };
      return config;
    },
  };
  
  export default nextConfig;