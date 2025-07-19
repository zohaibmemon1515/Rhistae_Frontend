import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination: 'https://rhistae-agent.sanity.studio/:path*',
      },
    ]
  },
}

export default nextConfig
