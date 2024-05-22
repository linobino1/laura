import type { Page } from '@payload-types'
import { twMerge } from 'tailwind-merge'
import RichText from '../RichText'
import Gutter from '../Gutter'
import Image from '../Image'

type BlockProps = Extract<NonNullable<Page['layout']>[0], { blockType: 'image' }>

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>, BlockProps {
  nested?: boolean
}

const sizeMap = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
}
export const ImageBlock: React.FC<Props> = ({
  image,
  caption_html,
  nested = false,
  size = 'medium',
  align = 'center',
  className,
  blockType,
  blockName,
  ...props
}) => {
  if (typeof image === 'string') {
    return null
  }
  return (
    <Gutter size={sizeMap[size] as any} disabled={nested} className="relative object-contain">
      <figure
        className={twMerge(
          'my-8 flex flex-col lg:my-16 xl:my-24',
          align === 'right' && 'ml-auto',
          align === 'left' && 'mr-auto',
          align === 'center' && 'mx-auto',
          nested ? 'lg:w-100%' : 'lg:w-80%',
          className,
        )}
        {...props}
        id={props.id || undefined}
      >
        <Image
          src={image.url || ''}
          alt={image.alt || 'alt'}
          width={image.width || 1}
          height={image.height || 1}
          className="h-full w-auto"
          srcSet={[
            {
              options: { width: 400 },
              size: '400w',
            },
            {
              options: { width: 800 },
              size: '800w',
            },
            {
              options: { width: 1400 },
              size: '1400w',
            },
            {
              options: { width: 2400 },
              size: '2400w',
            },
          ]}
          sizes={`${
            nested
              ? '(min-width: 900px) 400px, (min-width: 640px) 50vw'
              : '(min-width: 700px) 640px'
          }, 100vw`}
        />
        {caption_html && (
          <RichText
            as="figcaption"
            content={caption_html || ''}
            className={twMerge(`relative -top-2 text-right text-xs text-gray-800`)}
          />
        )}
      </figure>
    </Gutter>
  )
}
export default ImageBlock
