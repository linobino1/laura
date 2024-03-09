import type { Block } from "payload/types";
import { createSizeField } from "../fields/size";

export const Spacer: Block = {
  slug: "spacer",
  fields: [createSizeField("small")],
};

export default Spacer;
