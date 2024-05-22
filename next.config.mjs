import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
}

// export default withNextIntl(withPayload(nextConfig))
export default withPayload(nextConfig)
