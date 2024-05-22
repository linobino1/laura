export {}
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_PUBLIC_SERVER_URL: string
      USE_CLOUDFLARE_IMAGE_TRANSFORMATIONS: string
      CDN_CGI_IMAGE_URL: string
      NODE_ENV: string
      S3_ENABLED: string
      S3_ENDPOINT: string
      S3_BUCKET: string
      S3_REGION: string
      S3_ACCESS_KEY: string
      S3_SECRET_KEY: string
      MEDIA_URL: string
    }
  }
}
