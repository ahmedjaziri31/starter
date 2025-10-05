import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur']

export function useRTL() {
  const { i18n } = useTranslation()
  
  const isRTL = RTL_LANGUAGES.includes(i18n.language)
  
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
    
    // Add or remove RTL class to body for additional styling if needed
    if (isRTL) {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [isRTL, i18n.language])
  
  return { isRTL }
}
