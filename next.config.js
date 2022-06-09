/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/posts',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
