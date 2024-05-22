"use client";

import { FieldLabel } from "@payloadcms/ui/forms/FieldLabel";
import { useField } from "@payloadcms/ui/forms/useField";

export const URLField: React.FC<{ path: string; label?: string }> = ({
  path,
  label,
}) => {
  const { value } = useField<string>({ path });
  return (
    <div className="field-type text">
      <FieldLabel label={label} />
      <a href={value} target="_blank" rel="noreferrer">
        {value}
      </a>
    </div>
  );
};

export default URLField;
