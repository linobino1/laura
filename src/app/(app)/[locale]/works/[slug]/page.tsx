import { createPayload } from '@/app/util/createPayload'
import { notFound } from 'next/navigation'
import PageComponent from '@/app/components/Page'

export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await createPayload()
  const work = (
    await payload.find({
      collection: 'works',
      where: {
        slug: {
          equals: params.slug,
        },
      },
    })
  ).docs[0]

  if (!work) {
    return notFound()
  }

  return <PageComponent layout={work.layout} />
}
