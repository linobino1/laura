'use client'
import Link from 'next/link'
import Gutter from './Gutter'
import { usePathname } from 'next/navigation'

const BackButton = () => {
  const pathname = usePathname()
  return !['/', '/en', '/ee'].includes(pathname) ? (
    <Gutter size="lg">
      <div className="lg:absolute">
        <Link href="/">
          <div className="i-teenyicons:arrow-left-solid text-2xl" />
        </Link>
      </div>
    </Gutter>
  ) : null
}
export default BackButton
