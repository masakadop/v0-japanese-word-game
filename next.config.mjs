/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === "true"
const basePath = process.env.BASE_PATH || ""

const nextConfig = {
  output: "export",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    basePath,
    assetPrefix: basePath,
  }),
}

export default nextConfig
