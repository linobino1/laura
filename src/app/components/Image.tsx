import type { Media } from '@payload-types'
import React from 'react'
import getOptimizedImageUrl from '@/app/util/getOptimizedImageUrl'

/**
 * srcSet can either be used natively or by passing an array of  { options: cloudflare transformation options, width: css width }
 * e.g. { options: { width: 400, quality: 80 }, width: "500w" }
 */
export interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'srcSet'> {
  media?: Media
  srcSet?: { options: object; size: string }[] | string
}

export const Image: React.FC<Props> = ({ media, srcSet, src, alt, ...props }) => {
  // use src and alt from image if provided
  src ||= media?.url || undefined
  alt ||= media?.alt || undefined

  // transform srcSet array to string
  if (typeof srcSet === 'object') {
    srcSet = srcSet
      .map((item) => {
        return `${getOptimizedImageUrl(src || '', item.options)} ${item.size}`
      })
      .join(', ')
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={src}
      alt={alt}
      srcSet={srcSet}
      width={media?.width ?? props.width}
      height={media?.height ?? props.height}
    />
  )
}

export default Image
