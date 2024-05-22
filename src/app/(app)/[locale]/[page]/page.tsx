import { createPayload } from '@/app/util/createPayload'
import PageComponent from '@/app/components/Page'
import { Locale, validateLocale } from '@/app/util/validateLocale'
import { notFound } from 'next/navigation'

export default async function Page({
  params: { locale, page: slug },
}: {
  params: { locale: string; page: string }
}) {
  if (!validateLocale(locale)) {
    return notFound()
  }
  const payload = await createPayload()
  const page = (
    await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      locale: locale as Locale,
    })
  ).docs[0]

  if (!page) {
    return notFound()
  }

  return <PageComponent layout={page.layout} />
}
