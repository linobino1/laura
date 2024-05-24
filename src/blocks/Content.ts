import type { Block } from "payload/types";
import { lexicalHTML } from "@payloadcms/richtext-lexical";

export const Content: Block = {
  slug: "content",
  fields: [
    {
      name: "content",
      type: "richText",
      localized: true,
    },
    lexicalHTML("content", {
      name: "content_html",
    }),
  ],
};

export default Content;
