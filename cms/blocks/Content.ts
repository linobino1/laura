import type { Block } from "payload/types";
import {
  AlignFeature,
  HTMLConverterFeature,
  HeadingFeature,
  lexicalEditor,
  lexicalHTML,
} from "@payloadcms/richtext-lexical";
import { HTMLConverterWithAlign } from "../lexical/HTMLConverterWithAlign";

export const Content: Block = {
  slug: "content",
  fields: [
    {
      name: "content",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({
            enabledHeadingSizes: ["h3", "h4", "h5", "h6"],
          }),
          AlignFeature(),
          HTMLConverterFeature({
            // @ts-ignore
            converters: ({ defaultConverters }) => {
              return [HTMLConverterWithAlign, ...defaultConverters];
            },
          }),
        ],
      }),
    },
    lexicalHTML("content", {
      name: "content_html",
    }),
  ],
};

export default Content;
