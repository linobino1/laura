import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-mongodb'

/**
 * image block caption field changed from richtext to textarea
 */
export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const treatCaption = (caption: any) => {
    if (!caption) return {}
    return Object.keys(caption).reduce((acc: any, key: string) => {
      let res = ''
      if (caption[key]?.root?.children?.length) {
        if (caption[key].root.children[0].children?.length) {
          res = caption[key].root.children[0].children[0]?.text ?? ''
        }
      }
      acc[key] = res
      return acc
    }, {})
  }

  const treatBlocks = (blocks: any) => {
    return blocks?.map((block: any) => {
      if (block.blockType === 'image') {
        block = JSON.parse(JSON.stringify(block))

        // unset caption_html field
        delete block['caption_html']

        // convert caption to string
        block.caption = treatCaption(block.caption)
      }

      // block 'columns' -> 'doubleImage'
      if (block.blockType === 'columns') {
        block = {
          blockType: 'doubleImage',
          size: block.size,
          left:
            block.left.length && block.left[0].blockType === 'image'
              ? {
                  image: block.left[0].image,
                  size: block.left[0].size,
                  align: block.left[0].align,
                  caption: treatCaption(block.left[0].caption),
                }
              : null,
          right:
            block.right.length && block.right[0].blockType === 'image'
              ? {
                  image: block.right[0].image,
                  size: block.right[0].size,
                  align: block.right[0].align,
                  caption: treatCaption(block.right[0].caption),
                }
              : null,
        }
      }

      return block
    })
  }

  for (const collection of ['pages', 'works']) {
    const docs = await payload.db.connection.db.collection(collection).find({}).toArray()
    await Promise.all(
      docs.map(async (doc) => {
        return payload.db.connection.db
          .collection(collection)
          .updateOne({ _id: doc._id }, { $set: { layout: treatBlocks(doc.layout) } })
      }),
    )
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // Migration code
}
