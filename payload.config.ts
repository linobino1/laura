import path from "path";
import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { seo } from "@payloadcms/plugin-seo";
import {
  HTMLConverter,
  HTMLConverterFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import Users from "./cms/collections/Users";
import Media from "./cms/collections/Media";
import Pages from "./cms/collections/Pages";
import Works from "./cms/collections/Works";
import Categories from "./cms/collections/Categories";
import Navigation from "./cms/globals/Navigation";
import Site from "./cms/globals/Site";
import i18n from "./i18n";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import { HTMLConverterWithAlign } from "./cms/lexical/HTMLConverterWithAlign";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
    // @ts-ignore
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HTMLConverterFeature({
        converters: ({ defaultConverters }) => {
          return [
            ...defaultConverters,
            HTMLConverterWithAlign as HTMLConverter,
          ];
        },
      }),
    ],
  }),
  admin: {
    user: Users.slug,
  },
  collections: [Pages, Works, Categories, Media, Users],
  globals: [Navigation, Site],
  typescript: {
    outputFile: path.resolve(dirname, "cms/payload-types.ts"),
  },
  graphQL: {
    disable: true,
  },
  endpoints: [],
  plugins: [
    seo({
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
