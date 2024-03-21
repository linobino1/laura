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

const sizeMap = {
  small: "sm",
  medium: "md",
  large: "lg",
};
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
  return (
    <Gutter
      size={sizeMap[size] as any}
      disabled={nested}
      className="relative object-contain"
    >
      <figure
        className={twMerge(
          "my-8 flex flex-col lg:my-16 xl:my-24",
          align === "right" && "ml-auto",
          align === "left" && "mr-auto",
          align === "center" && "mx-auto",
          nested ? "lg:w-100%" : "lg:w-80%",
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
          className="h-full w-auto"
        />
        {caption_html && (
          <RichText
            as="figcaption"
            content={caption_html || ""}
            className={twMerge(
              `relative -top-2 text-right text-xs text-gray-800`,
            )}
          />
        )}
      </figure>
    </Gutter>
  );
};
export default ImageBlock;
