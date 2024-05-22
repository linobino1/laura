import type { CollectionConfig } from "payload/types";
import { publicReadOnly } from "../../access/publicReadOnly";
import { populateAlt } from "./hooks/populateAlt";

export const Media: CollectionConfig = {
  slug: "media",
  access: publicReadOnly,
  upload: true,
  admin: {
    pagination: {
      defaultLimit: 50,
    },
  },
  fields: [
    {
      name: "alt",
      label: "text alternative",
      type: "text",
      admin: {
        description: "Leave empty to use the filename",
      },
      hooks: {
        beforeValidate: [populateAlt],
      },
    },
  ],
};

export default Media;
