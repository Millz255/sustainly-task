/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Remove or comment out these experimental flags:
    // ppr: true,
    // clientSegmentCache: true,
    // nodeMiddleware: true,

    // Add this to disable devtools if needed:
    // reactProductionProfiling: false,
  },
  images: {
    domains: [
      'placehold.co', // Added this line to allow images from placehold.co
      // Add any other image domains you might use, e.g., 'unsplash.com'
    ],
  },
};

module.exports = nextConfig;
