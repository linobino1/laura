import type { FieldHook } from "payload/types";
import slugify from "slugify";

const format = (val: string): string =>
  slugify(val, {
    locale: "de",
    lower: true,
    strict: true,
  });

const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, siblingData: data }) => {
    if (typeof value === "string") {
      return format(value);
    }

    if (operation === "create") {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === "string") {
        return format(fallbackData);
      }
    }

    return value;
  };

export default formatSlug;
