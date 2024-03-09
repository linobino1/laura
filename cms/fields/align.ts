import { Field } from "payload/types";

export function createAlignField(defaultValue: string): Field {
  return {
    name: "align",
    type: "radio",
    defaultValue: defaultValue,
    options: [
      {
        label: "Left",
        value: "left",
      },
      {
        label: "Center",
        value: "center",
      },
      {
        label: "Right",
        value: "right",
      },
    ],
    required: true,
  };
}
