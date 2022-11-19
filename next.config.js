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
    FIREBASE_API_KEY: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_FIREBASE_API_KEY : process.env.NEXT_FIREBASE_API_KEY,

    FIREBASE_AUTH_DOMAIN: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN : process.env.NEXT_TEST_FIREBASE_AUTH_DOMAIN,

    FIREBASE_PROJECT_ID: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID : process.env.NEXT_TEST_FIREBASE_PROJECT_ID,

    FIREBASE_STORAGE_BUCKET: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET : process.env.NEXT_TEST_FIREBASE_STORAGE_BUCKET,

    FIREBASE_MESSAGING_SENDER_ID: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID : process.env.NEXT_TEST_FIREBASE_MESSAGING_SENDER_ID,

    FIREBASE_APP_ID: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID : process.env.NEXT_TEST_FIREBASE_APP_ID,

    FIREBASE_MEASUREMENT_ID: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID : process.env.NEXT_TEST_FIREBASE_MEASUREMENT_ID,

    FIREBASE_ADMIN_TYPE: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TYPE : process.env.NEXT_TEST_FIREBASE_ADMIN_TYPE,

    FIREBASE_ADMIN_PROJECT_ID: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID : process.env.NEXT_TEST_FIREBASE_ADMIN_PROJECT_ID,

    FIREBASE_ADMIN_PRIVATE_KEY_ID: process.env.NEXT_FIREBASE_ADMIN_PRIVATE_KEY_ID,

    FIREBASE_ADMIN_PRIVATE_KEY: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY : process.env.NEXT_TEST_FIREBASE_ADMIN_PRIVATE_KEY,

    FIREBASE_ADMIN_CLIENT_EMAIL: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL : process.env.NEXT_TEST_FIREBASE_ADMIN_CLIENT_EMAIL,

    FIREBASE_ADMIN_CLIENT_ID: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID : process.env.NEXT_TEST_FIREBASE_ADMIN_CLIENT_ID,

    FIREBASE_ADMIN_AUTH_URI: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_URI : process.env.NEXT_TEST_FIREBASE_ADMIN_AUTH_URI,

    FIREBASE_ADMIN_TOKEN_URI: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_TOKEN_URI : process.env.NEXT_TEST_FIREBASE_ADMIN_TOKEN_URI,

    FIREBASE_ADMIN_AUTH_PROVIDER_URL: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_AUTH_PROVIDER_URL : process.env.NEXT_TEST_FIREBASE_ADMIN_AUTH_PROVIDER_URL,

    FIREBASE_ADMIN_CLIENT_URL: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_URL : process.env.NEXT_TEST_FIREBASE_ADMIN_CLIENT_URL, 

    FIREBASE_ADMIN_DATABASE: process.env.NODE_ENV === "production" ? 
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_DATABASE : process.env.NEXT_TEST_FIREBASE_ADMIN_DATABASE, 
/*
    




*/
    
  },
})
