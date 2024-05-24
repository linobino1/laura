import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { HTMLConverter, HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import Users from '@/collections/Users'
import Media from '@/collections/Media'
import Pages from '@/collections/Pages'
import Works from '@/collections/Works'
import Categories from '@/collections/Categories'
import Navigation from '@/globals/Navigation'
import Site from '@/globals/Site'
import i18n from './i18n'
import { s3Storage } from '@payloadcms/storage-s3'
import { HTMLConverterWithAlign } from '@/lexical/HTMLConverterWithAlign'

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET as string,
  localization: {
    locales: i18n.supportedLngs,
    defaultLocale: i18n.fallbackLng,
    fallback: true,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI as string,
  }),
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HTMLConverterFeature({
        converters: ({ defaultConverters }) => {
          return [HTMLConverterWithAlign as HTMLConverter, ...defaultConverters]
        },
      }),
    ],
  }),
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Works, Categories, Media, Users],
  globals: [Navigation, Site],
  graphQL: {
    disable: true,
  },
  plugins: [
    seoPlugin({
      globals: ['site'],
      uploadsCollection: 'media',
    }),
    s3Storage({
      collections: {
        media: {
          generateFileURL: (file) => {
            return `${process.env.MEDIA_URL}/${file.filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY,
          secretAccessKey: process.env.S3_SECRET_KEY,
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
})
