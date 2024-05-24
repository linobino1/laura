import type { GlobalConfig } from 'payload/types'
import { isLoggedIn } from '@/access/isLoggedIn'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      fields: [
        {
          name: 'doc',
          type: 'relationship',
          relationTo: ['pages', 'works', 'categories'],
          required: true,
        },
      ],
    },
  ],
}

export default Navigation
