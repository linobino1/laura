import { blocks } from "../blocks";
import type { CollectionConfig } from "payload/types";
import { publicReadOnly } from "../access/publicReadOnly";
import { createUrlField } from "cms/fields/createUrlField";
import { createSlugField } from "cms/fields/createSlugField";

const Works: CollectionConfig = {
  slug: "works",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "slug", "updatedAt"],
    pagination: {
      defaultLimit: 50,
    },
  },
  access: publicReadOnly,
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
    createSlugField(({ data }) => data?.title),
    createUrlField(({ data }) => (data?.slug ? `/works/${data?.slug}` : null)),
  ],
};

export default Works;
