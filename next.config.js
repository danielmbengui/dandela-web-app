/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

//module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  nextConfig,
  env: {
    customKey: process.env.NODE_ENV === "production" ? 'my-value-prod' : 'my-value-dev',
    FIREBASE_PRIVATE_KEY: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PULIC_FIREBASE_PRIVATE_KEY : process.env.NEXT_TEST_FIREBASE_PRIVATE_KEY,
  },
  // next.js config
})
