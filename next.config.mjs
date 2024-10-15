/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, //disabled es lint
      
    },
    images: {
        domains: ["images.unsplash.com", "cdn.pixabay.com", "images.pexel.com"],
      },
  };
  
  export default nextConfig;
  