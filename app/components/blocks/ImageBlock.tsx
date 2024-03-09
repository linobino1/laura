import type { Page } from "payload/generated-types";
import { twMerge } from "tailwind-merge";
import RichText from "../RichText";
import Gutter from "../Gutter";

type BlockProps = Extract<
  NonNullable<Page["layout"]>[0],
  { blockType: "image" }
>;

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id">,
    BlockProps {
  nested?: boolean;
}

export const ImageBlock: React.FC<Props> = ({
  image,
  caption_html,
  nested = false,
  size = "medium",
  align = "center",
  className,
  blockType,
  blockName,
  ...props
}) => {
  if (typeof image === "string") {
    return null;
  }
  const aspectRatio = (image.width || 1) / (image.height || 1);
  const width = aspectRatio > 1 ? 100 : 66.6;
  const widthClass = aspectRatio > 1 ? "w-full" : "w-2/3";
  return (
    <Gutter size={size} disabled={nested} className="px-0">
      <div
        className={twMerge(
          "relative my-8 flex flex-col lg:my-8",
          align === "right" ? "items-end" : "",
          className,
        )}
        {...props}
        id={props.id || undefined}
      >
        <img
          src={image.url || ""}
          alt={image.alt || "alt"}
          width={image.width || 1}
          height={image.height || 1}
          style={{
            width: `${width}%`,
            height: "auto",
            marginInline: align === "center" ? "auto" : undefined,
          }}
        />
        {caption_html && (
          <RichText
            content={caption_html || ""}
            className={twMerge(
              `relative -top-2 -mb-6 text-right text-xs`,
              align === "center" ? `${widthClass} mx-auto` : "",
              align === "left" ? `${widthClass}` : "",
            )}
          />
        )}
      </div>
    </Gutter>
  );
};
export default ImageBlock;
