'use client'

import { createContext, useContext } from 'react'

export const LocaleContext = createContext({
  locale: 'en',
  messages: {},
  t: (key: string) => key,
})

export const useLocale = () => useContext(LocaleContext)

export function LocaleProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode
  locale: string
  messages: Record<string, string>
}) {
  const t = (key: string) => messages[key] || key
  return <LocaleContext.Provider value={{ locale, messages, t }}>{children}</LocaleContext.Provider>
}
