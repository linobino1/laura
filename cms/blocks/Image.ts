import type { Block, Field } from 'payload/types'
import { createAlignField } from '../fields/align'
import { createSizeField } from '../fields/size'

export const imageFields = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    type: 'row',
    fields: [createSizeField('medium'), createAlignField('center')],
  },
  {
    name: 'caption',
    type: 'textarea',
    localized: true,
  },
] satisfies Field[]

export const Image: Block = {
  slug: 'image',
  fields: [...imageFields],
}

export default Image
