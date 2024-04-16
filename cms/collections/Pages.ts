import { createUrlField } from "cms/fields/createUrlField";
import { publicReadOnly } from "../access/publicReadOnly";
import { blocks } from "../blocks";
import type { CollectionConfig } from "payload/types";
import { createSlugField } from "cms/fields/createSlugField";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "updatedAt"],
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
      name: "layout",
      label: "Layout",
      type: "blocks",
      blocks,
    },
    createSlugField(({ data }) => data?.title),
    createUrlField(({ data }) => (data?.slug ? `/${data?.slug}` : null)),
  ],
};

export default Pages;
