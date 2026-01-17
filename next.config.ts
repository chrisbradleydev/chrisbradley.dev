import type {NextConfig} from 'next'
import './env.ts'

const config: NextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  typescript: {ignoreBuildErrors: true},
}

export default config
