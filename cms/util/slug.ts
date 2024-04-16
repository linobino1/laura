import slugify from "slugify";

export const slug = (s: string | null | undefined): string =>
  slugify(s || "", { lower: true, locale: "en" });
