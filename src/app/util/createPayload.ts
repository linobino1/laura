import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";

export const createPayload = async () => {
  return await getPayloadHMR({
    config: configPromise,
  });
};
