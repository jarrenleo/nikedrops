/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "secure-images.nike.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
