'use client'
import * as React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SUPPORTED_LOCALES, stripLocaleFromPath } from '@/i18n/locales'

export type LanguageSwitcherProps = {
  className?: string
}

const localeLabels: Record<string, string> = {
  es: 'ES',
  de: 'DE',
  ja: 'JA',
}

function LanguageSwitcher(props: LanguageSwitcherProps) {
  const [path, setPath] = useState<string | undefined>(() => undefined)

  useEffect(() => {
    setPath(window.location.pathname)
  }, [])

  if (path === undefined) {
    return null
  }

  const { locale, basePath } = stripLocaleFromPath(path)

  const options = [
    { code: undefined, label: 'EN', href: basePath },
    ...SUPPORTED_LOCALES.map((code) => ({
      code: code as string | undefined,
      label: localeLabels[code],
      href: `/${code}${basePath === '/' ? '' : basePath}`,
    })),
  ]

  return (
    <div className={`flex items-center gap-3 ${props.className ?? ''}`}>
      {options.map((option) => (
        <Link
          key={option.label}
          href={option.href}
          className={`text-sm font-semibold leading-tight transition-colors duration-200 ${
            locale === option.code
              ? 'text-stone-900'
              : 'text-stone-400 hover:text-stone-700'
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  )
}

export default LanguageSwitcher
