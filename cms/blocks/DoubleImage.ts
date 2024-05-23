import type { Block } from 'payload/types'
import { imageFields } from './Image'
import { createSizeField } from 'cms/fields/size'

export const DoubleImage: Block = {
  slug: 'doubleImage',
  fields: [
    createSizeField('medium'),
    {
      name: 'left',
      type: 'group',
      fields: [...imageFields],
    },
    {
      name: 'right',
      type: 'group',
      fields: [...imageFields],
    },
  ],
}

export default DoubleImage
