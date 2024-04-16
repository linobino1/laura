import type { CollectionConfig } from "payload/types";
import { publicReadOnly } from "../access/publicReadOnly";
import { createUrlField } from "cms/fields/createUrlField";
import { createSlugField } from "cms/fields/createSlugField";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "title",
  },
  access: publicReadOnly,
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      required: true,
    },
    createSlugField(({ data }) => data?.title),
    createUrlField(({ data }) =>
      data?.slug ? `/categories/${data?.slug}` : null,
    ),
  ],
};

export default Categories;
