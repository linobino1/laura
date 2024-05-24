import type { GlobalConfig } from 'payload/types'
import { isLoggedIn } from '@/access/isLoggedIn'

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: () => true,
    update: isLoggedIn,
  },
  fields: [],
}

export default Site
