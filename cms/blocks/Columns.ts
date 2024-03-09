import type { Block } from "payload/types";
import Image from "./Image";
import Content from "./Content";

export const Columns: Block = {
  slug: "columns",
  fields: [
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
