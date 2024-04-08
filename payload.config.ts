import path from "path";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import seoPlugin from "@payloadcms/plugin-seo";
import {
  HTMLConverterFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { viteBundler } from "@payloadcms/bundler-vite";
import Users from "./cms/collections/Users";
import Media from "./cms/collections/Media";
import Pages from "./cms/collections/Pages";
import Works from "./cms/collections/Works";
import Categories from "./cms/collections/Categories";
import Navigation from "./cms/globals/Navigation";
import Site from "./cms/globals/Site";
import addSlugField from "./cms/plugins/addSlugField";
import addUrlField from "./cms/plugins/addUrlField";
import i18n from "./i18n";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { HTMLConverterWithAlign } from "./cms/lexical/HTMLConverterWithAlign";

export default buildConfig({
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
        // @ts-ignore
        converters: ({ defaultConverters }) => {
          return [...defaultConverters, HTMLConverterWithAlign];
        },
      }),
    ],
  }),
  admin: {
    user: Users.slug,
    bundler: viteBundler(),
    vite: (incomingViteConfig) => ({
      ...incomingViteConfig,
      build: {
        ...incomingViteConfig.build,
        emptyOutDir: false,
      },
    }),
  },
  collections: [Pages, Works, Categories, Media, Users],
  globals: [Navigation, Site],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
  plugins: [
    addSlugField,
    addUrlField,
    seoPlugin({
      globals: ["site"],
      uploadsCollection: "media",
    }),
    cloudStorage({
      enabled: process.env.S3_ENABLED === "true",
      collections: {
        media: {
          disablePayloadAccessControl: true, // serve files directly from S3
          generateFileURL: (file) => {
            return `${process.env.MEDIA_URL}/${file.filename}`;
          },
          adapter: s3Adapter({
            bucket: process.env.S3_BUCKET || "",
            config: {
              endpoint: process.env.S3_ENDPOINT || undefined,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || "",
                secretAccessKey: process.env.S3_SECRET_KEY || "",
              },
              region: process.env.S3_REGION || "",
            },
          }),
        },
      },
    }),
  ],
});
