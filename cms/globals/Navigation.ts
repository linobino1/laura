import type { GlobalConfig } from "payload/types";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  fields: [
    {
      name: "items",
      type: "array",
      minRows: 1,
      labels: {
        singular: "Item",
        plural: "Items",
      },
      fields: [
        {
          name: "doc",
          type: "relationship",
          relationTo: ["pages", "works", "categories"],
          required: true,
        },
      ],
    },
  ],
};

export default Navigation;
