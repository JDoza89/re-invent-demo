/**
 * Non-default locales enabled on the Storyblok space (Settings -> Internationalization).
 * Keep this in sync with the space's language config -- it's not fetched at
 * runtime since that would require a Management API call from the frontend.
 * The default locale (English) is served unprefixed and isn't listed here.
 */
export const SUPPORTED_LOCALES = ['es', 'de', 'ja'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(value)

/**
 * Strips a leading locale segment off a path, e.g. `/de/about` -> locale
 * `de`, base path `/about`. Assumes a locale's path mirrors the default
 * locale's path, which holds today since translated slugs haven't diverged.
 */
export const stripLocaleFromPath = (
  path: string,
): { locale: SupportedLocale | undefined; basePath: string } => {
  const segments = path.split('/').filter(Boolean)
  const [first, ...rest] = segments
  if (first && isSupportedLocale(first)) {
    return { locale: first, basePath: '/' + rest.join('/') }
  }
  return { locale: undefined, basePath: path }
}
