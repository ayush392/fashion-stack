/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rukminim1.flixcart.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
export default nextConfig;
