'use client'

import { twMerge } from 'tailwind-merge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type Navigation as NavigationType } from '@payload-types'
import { useLocale } from '../providers/LocaleProvider'

const Navigation: React.FC<{ navigation: NavigationType }> = ({ navigation }) => {
  const pathname = usePathname()
  const { items } = navigation
  const { locale } = useLocale()

  return (
    <nav>
      {items?.map((item, index) =>
        typeof item.doc.value !== 'string' ? (
          <div key={index}>
            {item.doc.relationTo === 'categories' ? (
              <div
                key={index}
                className={twMerge(
                  'py-1 text-sm font-light italic text-gray-900',
                  index !== 0 && 'mt-4',
                )}
              >
                {item.doc.value.title}
              </div>
            ) : (
              <Link
                href={`${locale}/${item.doc.value.url}`}
                key={index}
                className={twMerge('', pathname === item.doc.value.url && 'text-gray-500')}
              >
                {item.doc.value.title}
              </Link>
            )}
          </div>
        ) : null,
      )}
    </nav>
  )
}
export default Navigation
