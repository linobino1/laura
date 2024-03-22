import type { CollectionConfig } from "payload/types";
import { publicReadOnly } from "../access/publicReadOnly";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  access: publicReadOnly,
  custom: {
    addUrlField: {
      hook: (slug?: string) => `/categories/${slug || ""}`,
    },
    addSlugField: {
      from: "title",
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
  ],
};

export default Categories;
