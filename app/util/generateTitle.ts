import type { Site } from "payload/generated-types";

export default function generateTitle(site: Site, doc: any) {
  let docTitle = doc?.slug === "home" ? null : doc?.title;
  return [docTitle, site?.meta?.title].filter(Boolean).join(" · ");
}
