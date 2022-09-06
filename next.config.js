/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,  
  compiler: {
    styledComponents: true,
  },
  images: {
    loader: 'imgix',
    path: 'https://cdn.myanimelist.net/',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
