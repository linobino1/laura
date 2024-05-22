import React from 'react'
import '@unocss/reset/tailwind.css'
import '../uno.css'
import '../global.css'
import Header from '@/app/components/Header'
import { dir } from 'i18next'
import { LocaleProvider } from '@/app/providers/LocaleProvider'
import BackButton from '@/app/components/BackButton'
import BackToTop from '@/app/components/BackToTop'
import { createPayload } from '@/app/util/createPayload'
import { Locale } from '@/app/util/validateLocale'
import getOptimizedImageUrl from '@/app/util/getOptimizedImageUrl'
import { Media } from '@payload-types'

/* Our app sits here to not cause any conflicts with payload's root layout  */
export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const payload = createPayload()

  // load messages for the locale
  const [importedMessage, site] = await Promise.all([
    import(`../../../../messages/${locale}.json`),
    (
      await payload
    ).findGlobal({
      slug: 'site',
      locale: locale as Locale,
      depth: 1,
    }),
  ])

  const messages = importedMessage.default

  return (
    <html lang={locale} dir={dir(locale)} className="font-serif">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        {site.meta?.description && (
          <>
            <meta name="description" content={site.meta.description} />
            <meta property="og:description" content={site.meta.description} />
          </>
        )}
        {site.meta?.image && (
          <meta
            property="og:image"
            content={getOptimizedImageUrl((site.meta.image as Media).url as string, {
              width: 1200,
            })}
          />
        )}
      </head>
      <body>
        <LocaleProvider locale={locale} messages={messages}>
          <Header />
          <BackButton />
          <div className="mb-12 mt-8 md:flex md:min-h-[66vh] md:flex-col md:justify-center lg:mt-24">
            {children}
          </div>
          <BackToTop />
        </LocaleProvider>
      </body>
    </html>
  )
}
