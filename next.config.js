/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xizgjjkyqpzyuwxcgcuk.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      allowedDevOrigins: [
        'https://*.cluster-cz5nqyh5nreq6ua6gaqd7okl7o.cloudworkstations.dev',
      ],
    },
  }),
};

module.exports = nextConfig;
