import type { Field as FieldType } from 'payload/types'
import deepMerge from '@/util/deepMerge'
import URLField from './URLField'

type UrlGenerator<T> = (data: Partial<T>) => string

type Url<T> = (generator?: UrlGenerator<T>, overrides?: Partial<FieldType>) => FieldType

export const url: Url<any> = (
  generator = (data: Partial<any>) => `/${data.slug}`,
  overrides = {},
) =>
  deepMerge<FieldType, Partial<FieldType>>(
    {
      name: 'url',
      type: 'text',
      hooks: {
        // don't save url in database
        beforeChange: [() => null],
        afterRead: [
          ({ siblingData }) => {
            if (!siblingData) return ''
            return generator(siblingData)
          },
        ],
      },
      admin: {
        position: 'sidebar',
        components: {
          Field: URLField,
        },
      },
    },
    overrides,
  )
