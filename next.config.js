const {env} = require('./server/env')

/**
 * @template {import('next').NextConfig} T
 * @param {T} config
 * @constraint {{import('next').NextConfig}}
 */
const getConfig = config => config

module.exports = getConfig({
  poweredByHeader: false,
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  reactStrictMode: true,
})
