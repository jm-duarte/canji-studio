/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  allowedDevOrigins: ["*.spock.replit.dev", "*.replit.dev", "*.repl.co"],
};

export default nextConfig;
