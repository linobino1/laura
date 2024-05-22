import LanguageSelector from './LanguageSelector'
import Gutter from './Gutter'
import Link from 'next/link'
import { createPayload } from '../util/createPayload'

const Header: React.FC = async () => {
  const payload = await createPayload()
  const site = await payload.findGlobal({
    slug: 'site',
  })
  return (
    <header className="z-100 relative top-0 bg-white md:sticky">
      <Gutter size="lg" className="mb-4 mt-4 w-full pt-4 md:mt-16">
        <div className="border-b-1 flex border-gray-400 pb-2">
          <Link href="/" className="grow justify-self-start uppercase">
            {site.meta?.title}
          </Link>
          <LanguageSelector className="justify-self-end" />
        </div>
      </Gutter>
    </header>
  )
}
export default Header
