import { publicReadOnly } from '../access/publicReadOnly'
import { blocks } from '../blocks'
import type { CollectionConfig } from 'payload/types'
import { slugField } from 'cms/fields/slug'
import { url } from 'cms/fields/url'

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'layout',
      label: 'Layout',
      type: 'blocks',
      blocks,
    },
    slugField('title'),
    url((data) => `/${data.slug}`),
  ],
}

export default Pages
