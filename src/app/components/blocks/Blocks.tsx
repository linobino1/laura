import React from 'react'
import type { Page } from '@payload-types'
import ImageBlock from './ImageBlock'
import Content from './Content'
import Spacer from './Spacer'
import Gutter from '../Gutter'
import { twMerge } from 'tailwind-merge'

export interface BlockProps extends React.HTMLAttributes<HTMLDivElement> {
  block?: NonNullable<Page['layout']>[0]
  nested?: boolean
}

const sizeMap = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
}

export const Block: React.FC<BlockProps> = ({
  block,
  children,
  className,
  nested = false,
  ...props
}) => {
  if (!block) return null
  return (
    <div className={className} {...props}>
      {(() => {
        switch (block.blockType) {
          case 'content':
            return <Content {...block} />

          case 'image':
            return <ImageBlock {...block} nested={nested} />

          case 'doubleImage':
            return (
              <Gutter
                className={twMerge('grid-cols-2 gap-12 sm:grid')}
                size={sizeMap[block.size] as any}
              >
                <ImageBlock blockType={'image'} {...block.left} nested={true} />
                <ImageBlock blockType={'image'} {...block.right} nested={true} />
              </Gutter>
            )

          case 'spacer':
            return <Spacer {...block} />

          default:
            return <p>unimplemented block type</p>
        }
      })()}
    </div>
  )
}

export interface BlocksProps extends React.HTMLAttributes<HTMLDivElement> {
  blocks: Page['layout']
  nested?: boolean
}

export const Blocks: React.FC<BlocksProps> = ({ blocks, nested = false, children, ...props }) => (
  <div {...props}>
    {blocks?.map((block, i) => (
      <Block key={i} block={block} nested={nested}>
        {children}
      </Block>
    ))}
  </div>
)

export default Blocks
