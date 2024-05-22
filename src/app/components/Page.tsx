import { type Page as PageType } from '@payload-types'
import Blocks from './blocks/Blocks'

export type PageProps = {
  layout: PageType['layout']
}
const Page: React.FC<PageProps> = ({ layout }) => {
  return (
    <div className="mb-12 mt-8 md:flex md:min-h-[66vh] md:flex-col md:justify-center lg:mt-24">
      <Blocks blocks={layout} />
    </div>
  )
}
export default Page
