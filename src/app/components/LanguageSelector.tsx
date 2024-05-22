'use client'

import Link from 'next/link'
import React, { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { useLocale } from '../providers/LocaleProvider'
import { usePathname } from 'next/navigation'

const languages = [
  { locale: 'ee', name: 'EST' },
  { locale: 'en', name: 'ENG' },
]

const LanguageSelector: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const { locale: currentLocale } = useLocale()
  const pathname = usePathname()

  return (
    <div {...props} className={twMerge('flex', className)}>
      {languages.map((language, index) => {
        const url = pathname.replace(/^\/[a-z]{2}/, `/${language.locale}`)

        return (
          <div className="contents" key={index}>
            <Link className={currentLocale === language.locale ? '' : 'text-gray-500'} href={url}>
              {language.name}
            </Link>
            <div
              className={twMerge(
                index == languages.length - 1 ? 'hidden' : '',
                'mx-1 text-gray-500',
              )}
            >
              {'/'}
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default LanguageSelector
