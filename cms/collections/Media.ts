import type { CollectionConfig } from "payload/types";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: (): boolean => true, // Everyone can read Media
  },
  upload: {
    staticURL: "/media",
  },
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
        beforeValidate: [
          // use filename as alt text if alt text is empty
          ({ value, data }) => {
            if (typeof value === "string" && value.length > 0) {
              return value;
            }
            if (typeof data?.filename === "string") {
              return data.filename.split(".")[0];
            }
            return value;
          },
        ],
      },
    },
  ],
};

export default Media;
