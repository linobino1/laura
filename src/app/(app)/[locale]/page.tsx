import React from 'react'
import Navigation from '@/app/components/Navigation'
import Gutter from '@/app/components/Gutter'
import { createPayload } from '@/app/util/createPayload'
import { Locale, validateLocale } from '@/app/util/validateLocale'
import { notFound } from 'next/navigation'
import PageComponent from '@/app/components/Page'

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  if (!validateLocale(locale)) {
    return notFound()
  }
  const payload = await createPayload()
  const [navigation, pages] = await Promise.all([
    payload.findGlobal({
      slug: 'navigation',
      locale: locale as Locale,
    }),
    payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
      locale: locale as Locale,
    }),
  ])
  const page = pages.docs[0]

  return (
    <>
      <Gutter size="lg">
        <div className="lg:absolute">
          <Navigation navigation={navigation} />
        </div>
      </Gutter>
      {page ? <PageComponent layout={page.layout} /> : null}
    </>
  )
}

export default Page
