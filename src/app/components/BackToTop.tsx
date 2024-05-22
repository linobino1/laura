'use client'

import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Gutter from './Gutter'
import { usePathname } from 'next/navigation'
import { useLocale } from '../providers/LocaleProvider'

const BackToTop: React.FC = () => {
  const { t, messages } = useLocale()
  const onClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // on navigation, check if the page is long enough to show the button
  const [showButton, setShowButton] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const offsetHeight = document.documentElement.offsetHeight
    const innerHeight = window.innerHeight

    // don't show the button if the page is not long enough
    if (offsetHeight > innerHeight) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }, [pathname])

  return (
    showButton && (
      <Gutter size="lg">
        <div className="border-b-1 border-gray-400 pt-12 md:pt-12" />
        <button onClick={onClickHandler} className={twMerge('float-right pb-8 pt-2 md:pb-20')}>
          {t('Back to top')}
        </button>
      </Gutter>
    )
  )
}
export default BackToTop
