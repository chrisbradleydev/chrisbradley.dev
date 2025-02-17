// @ts-check
import './env.js'

/** @type {import("next").NextConfig} */
const config = {
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
