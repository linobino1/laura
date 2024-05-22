import { Media } from '@payload-types'
import type { FieldHook } from 'payload/types'

/**
 * Use filename as alt text if alt text is empty
 */
export const populateAlt: FieldHook<Media> = async ({ value, data }) => {
  if (typeof value === 'string' && value.length > 0) {
    return value
  }
  if (typeof data?.filename === 'string') {
    return data.filename.split('.')[0]
  }
  return value
}
