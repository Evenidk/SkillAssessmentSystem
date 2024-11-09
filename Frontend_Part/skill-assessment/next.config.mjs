/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
    experimental: {
      esmExternals: 'loose',
    },
  };
  
  export default nextConfig;
  