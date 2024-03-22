import type { CollectionConfig } from "payload/types";
import { isLoggedIn } from "../access/isLoggedIn";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  access: {
    // Only allow creation of users to non-admins if no users exist
    create: async ({ req: { payload, user } }) =>
      !!user || (await payload.find({ collection: "users" })).totalDocs === 0,
    read: isLoggedIn, // Only allow reading of users to admins
    update: isLoggedIn,
    delete: isLoggedIn,
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
