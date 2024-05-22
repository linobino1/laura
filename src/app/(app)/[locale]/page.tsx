import React from 'react'
import Navigation from '@/app/components/Navigation'
import Gutter from '@/app/components/Gutter'
import { createPayload } from '@/app/util/createPayload'
import { Locale, validateLocale } from '@/app/util/validateLocale'
import { notFound } from 'next/navigation'

const Page = async ({ params: { locale } }: { params: { locale: string } }) => {
  if (!validateLocale(locale)) {
    return notFound()
  }
  const payload = await createPayload()
  const navigation = await payload.findGlobal({
    slug: 'navigation',
    locale: locale as Locale,
  })
  return (
    <Gutter size="lg" className="mb-4 mt-4 w-full pt-4 md:mt-16">
      <Navigation navigation={navigation} />
    </Gutter>
  )
}

export default Page
