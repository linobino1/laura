import { createPayload } from '@/app/util/createPayload'
import { notFound } from 'next/navigation'
import PageComponent from '@/app/components/Page'
import { Locale, validateLocale } from '@/app/util/validateLocale'

export default async function Page({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string }
}) {
  if (!validateLocale(locale)) {
    return notFound()
  }
  const payload = await createPayload()
  const work = (
    await payload.find({
      collection: 'works',
      where: {
        slug: {
          equals: slug,
        },
      },
      locale: locale as Locale,
    })
  ).docs[0]

  if (!work) {
    return notFound()
  }

  return <PageComponent layout={work.layout} />
}
