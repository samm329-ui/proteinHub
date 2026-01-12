import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
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
      }
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
  // Adding this to allow cross-origin requests in development
  // This is necessary for the Firebase Studio environment
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      allowedDevOrigins: [
        'https://*.cluster-cz5nqyh5nreq6ua6gaqd7okl7o.cloudworkstations.dev',
      ],
    },
  }),
};

export default nextConfig;
