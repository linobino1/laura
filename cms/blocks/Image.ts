import type { Block } from "payload/types";
import { createAlignField } from "../fields/align";
import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { createSizeField } from "../fields/size";

export const Image: Block = {
  slug: "image",
  fields: [
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      type: "row",
      fields: [createSizeField("medium"), createAlignField("center")],
    },
    {
      name: "caption",
      type: "richText",
      localized: true,
      required: false,
    },
    lexicalHTML("caption", {
      name: "caption_html",
    }),
  ],
};

export default Image;
