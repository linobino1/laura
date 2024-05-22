import Blocks from '@/app/components/blocks/Blocks'
import { createPayload } from '@/app/util/createPayload'

export default async function Page({ params }: { params: { page: string } }) {
  const payload = await createPayload()
  const page = (
    await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: params.page,
        },
      },
    })
  ).docs[0]

  if (!page) {
    return <div>Page not found</div>
  }

  return <Blocks blocks={page.layout} />
}
