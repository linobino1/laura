import { blocks } from '@/blocks'
import type { CollectionConfig } from 'payload/types'
import { publicReadOnly } from '@/access/publicReadOnly'
import { slugField } from '@/fields/slug'
import { url } from '@/fields/url'

const Works: CollectionConfig = {
  slug: 'works',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
    pagination: {
      defaultLimit: 50,
    },
  },
  access: publicReadOnly,
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
    },
    {
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks,
    },
    slugField('title'),
    url((data) => `/works/${data.slug}`),
  ],
}

export default Works
