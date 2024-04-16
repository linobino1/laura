import { Field, FieldHookArgs } from "payload/types";
import slugify from "slugify";

export const createSlugField = (
  hook: (args: FieldHookArgs) => string | null | undefined,
): Field => ({
  name: "slug",
  type: "text",
  required: true,
  admin: {
    readOnly: true,
    position: "sidebar",
  },
  hooks: {
    beforeValidate: [
      (args: FieldHookArgs) => {
        return slugify(hook(args) || "", {
          lower: true,
          locale: "en",
        });
      },
    ],
  },
});
