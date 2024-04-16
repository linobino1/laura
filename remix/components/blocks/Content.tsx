import { Page } from "payload/generated-types";
import RichText from "../RichText";
import Gutter from "../Gutter";

type BlockProps = Extract<
  NonNullable<Page["layout"]>[0],
  { blockType: "content" }
>;

interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "content">,
    Omit<BlockProps, "content"> {
  content?: any;
  as?: string;
}

export const Content: React.FC<Props> = ({
  content,
  content_html,
  className,
  blockType,
  blockName,
  as = "div",
  ...props
}) => {
  return (
    <Gutter size="sm" {...props} id={props.id || undefined}>
      <RichText content={content_html || ""} />
    </Gutter>
  );
};
export default Content;
