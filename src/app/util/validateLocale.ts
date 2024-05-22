import i18n from '../../../i18n'

export type Locale = 'en' | 'ee'

export const validateLocale = (locale: string) => {
  return i18n.supportedLngs.includes(locale)
}
