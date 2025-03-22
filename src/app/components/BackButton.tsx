'use client'
import Link from 'next/link'
import Gutter from './Gutter'
import { usePathname } from 'next/navigation'
import { useLocale } from '../providers/LocaleProvider'

const BackButton = () => {
  const pathname = usePathname()
  const { locale } = useLocale()

  return !['/', '/en', '/ee'].includes(pathname) ? (
    <Gutter size="lg">
      <div className="lg:absolute">
        <Link href={`/${locale ?? ''}`}>
          <div className="i-teenyicons:arrow-left-solid text-2xl" />
        </Link>
      </div>
    </Gutter>
  ) : null
}
export default BackButton
