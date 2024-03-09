import React from "react";
import { Page } from "payload/generated-types";
import ImageBlock from "./ImageBlock";
import Content from "./Content";
import Spacer from "./Spacer";

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block?: NonNullable<Page["layout"]>[0];
  nested?: boolean;
}

export const Block: React.FC<BlockProps> = ({
  block,
  children,
  className,
  nested = false,
  ...props
}) => {
  if (!block) return null;
  return (
    <div className={className} {...props}>
      {(() => {
        switch (block.blockType) {
          case "content":
            return <Content {...block} />;

          case "image":
            return <ImageBlock {...block} nested={nested} />;

          case "columns":
            return (
              <div className="mx-auto w-[66%] grid-cols-2 items-center gap-8 sm:grid sm:w-full">
                <Blocks blocks={block.left} nested={true} />
                <Blocks blocks={block.right} nested={true} />
              </div>
            );

          case "spacer":
            return <Spacer {...block} />;

          default:
            return <p>unimplemented block type</p>;
        }
      })()}
    </div>
  );
};

export interface BlocksProps extends React.HTMLAttributes<HTMLDivElement> {
  blocks: Page["layout"];
  nested?: boolean;
}

export const Blocks: React.FC<BlocksProps> = ({
  blocks,
  nested = false,
  children,
  ...props
}) => (
  <div {...props}>
    {blocks?.map((block, i) => (
      <Block key={i} block={block} nested={nested}>
        {children}
      </Block>
    ))}
  </div>
);

export default Blocks;
