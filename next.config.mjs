/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

// Check if we need to enable PWA features
const withPWA = (config) => {
  try {
    // Dynamic import to avoid issues in environments where next-pwa isn't installed
    const withPWAModule = require('next-pwa')
    return withPWAModule({
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
      fallbacks: {
        document: '/offline',
      }
    })(config)
  } catch (e) {
    console.warn('next-pwa not installed, skipping PWA features')
    return config
  }
}

export default withPWA(nextConfig)
