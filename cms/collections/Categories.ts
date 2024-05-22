import type { CollectionConfig } from "payload/types";
import { publicReadOnly } from "../access/publicReadOnly";
import { slugField } from "cms/fields/slug";
import { url } from "cms/fields/url";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  // access: publicReadOnly,
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    slugField("title"),
    url((data) => `/categories/${data.slug}`),
  ],
};

export default Categories;
