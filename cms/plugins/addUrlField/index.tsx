import type { Config, Plugin } from "payload/config";
import type { FieldHookArgs } from "payload/dist/fields/config/types";

/**
 * this plugin adds a url field to a collection if you add the following to the collection config:
 * custom: {
 *  addUrlField: {
 *   hook: (slug?: string) => `my/path/${slug || ''}`,
 * },
 */
export const addUrlField: Plugin = (incomingConfig: Config): Config => {
  // Spread the existing config
  const config: Config = {
    ...incomingConfig,
    // @ts-ignore
    collections: [
      ...(incomingConfig.collections?.map((collection) =>
        collection.custom?.addUrlField
          ? {
              ...collection,
              admin: {
                ...collection.admin,
                enableRichTextLink: true,
                enableRichTextRelationship: true,
              },
              fields: [
                ...collection.fields,
                {
                  name: "url",
                  type: "text",
                  required: true,
                  validate: () => true,
                  hooks: {
                    beforeChange: [
                      ({ siblingData }: FieldHookArgs): void => {
                        // ensures data is not stored in DB
                        delete siblingData["url"];
                      },
                    ],
                    afterRead: [
                      ({ siblingData }: FieldHookArgs): string => {
                        const relativeUrl =
                          collection.custom?.addUrlField.hook(
                            siblingData.slug
                          ) || "";
                        return relativeUrl || "";
                      },
                    ],
                  },
                  admin: {
                    position: "sidebar",
                    readOnly: true,
                    components: {
                      Field: undefined,
                    },
                  },
                },
              ],
            }
          : {
              ...collection,
              admin: {
                ...collection.admin,
                enableRichTextLink: false,
                enableRichTextRelationship: false,
              },
            }
      ) || []),
    ],
  };

  return config;
};

export default addUrlField;