import { isLoggedIn } from "../access/isLoggedIn";
import type { GlobalConfig } from "payload/types";

export const Site: GlobalConfig = {
  slug: "site",
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [],
};

export default Site;
