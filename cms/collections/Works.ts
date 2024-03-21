import { blocks } from "../blocks";
import type { CollectionConfig } from "payload/types";

const Works: CollectionConfig = {
  slug: "works",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "slug", "updatedAt"],
    pagination: {
      defaultLimit: 50,
    },
  },
  access: {
    read: () => true,
  },
  custom: {
    addUrlField: {
      hook: (slug?: string) => `/works/${slug || ""}`,
    },
    addSlugField: {
      from: "title",
    },
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: false,
    },
    {
      name: "layout",
      label: "Layout",
      type: "blocks",
      blocks,
    },
  ],
};

export default Works;
