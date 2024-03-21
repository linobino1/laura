import type { Block } from "payload/types";
import Image from "./Image";
import Content from "./Content";
import { createSizeField } from "../fields/size";

export const Columns: Block = {
  slug: "columns",
  fields: [
    createSizeField("medium"),
    {
      name: "left",
      type: "blocks",
      blocks: [Image, Content],
    },
    {
      name: "right",
      type: "blocks",
      blocks: [Image, Content],
    },
  ],
};

export default Columns;
