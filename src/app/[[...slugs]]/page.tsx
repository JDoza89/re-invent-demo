import { getStoryPath } from '@/delivery-api'
import {
  BridgeSearchParams,
  parseBridgeSearchParams,
} from '@/BridgeSearchParams'
import {
  array,
  formatResult,
  object,
  parseString,
  withDefault,
} from 'pure-parse'
import { notFound } from 'next/navigation'
import { getStoryblokApi } from '@/lib/storyblok'
import { StoryblokStory } from '@storyblok/react/rsc'
import { cache } from 'react'
import type { Metadata } from 'next'
import { isSupportedLocale } from '@/i18n/locales'
// Parsing: uncomment the lines below to perform runtime validation of the story content
// import { parseContent } from '@/content'

const resolveRelations = ['teamMembers.teamMembers']

type DynamicPageProps = {
  params: Promise<unknown>
  searchParams: Promise<unknown>
}

const parseParams = object<{ slugs: string[] }>({
  slugs: withDefault(array(parseString), []),
})

/**
 * Splits a leading locale segment off the path (e.g. `/de/about` -> locale
 * `de`, page slugs `['about']`). Unprefixed paths resolve to the space's
 * default language, matching Storyblok's convention of not prefixing the
 * default locale's full_slug.
 */
const splitLocaleFromSlugs = (
  slugs: string[],
): { locale: string | undefined; pageSlugs: string[] } => {
  const [first, ...rest] = slugs
  if (first && isSupportedLocale(first)) {
    return { locale: first, pageSlugs: rest }
  }
  return { locale: undefined, pageSlugs: slugs }
}

/**
 * Fetch a story from the Storyblok delivery API.
 * Wrapped in React's `cache` so `generateMetadata` and the page component
 * share a single fetch per request instead of calling the API twice.
 * @throws an error if the story could not be fetched or parsed.
 * @param slugs an array of the path segments of the current page
 * @param bridgeSearchParams an object containing the parsed search parameters from the Storyblok bridge
 */
const getStory = cache(
  async (slugs: string[], bridgeSearchParams: BridgeSearchParams) => {
    const client = getStoryblokApi()
    const { locale, pageSlugs } = splitLocaleFromSlugs(slugs)

    return await client
      .get(`cdn/stories/${getStoryPath(pageSlugs, bridgeSearchParams)}`, {
        resolve_relations: resolveRelations,
        version: bridgeSearchParams.version,
        // The visual editor's language switcher takes priority in draft mode;
        // otherwise, use the locale detected from the URL (or the default language).
        language:
          bridgeSearchParams.version === 'draft'
            ? bridgeSearchParams._storyblok_lang
            : (locale ?? 'default'),
      })
      .then((result) => result.data)
      .catch((error: { status: number; message: string }) => {
        if (error.status === 404) {
          notFound()
        }
        throw new Error(
          `Failed to fetch story: ${error.status} ${error.message}`,
        )
      })
  },
)

export async function generateMetadata(
  props: DynamicPageProps,
): Promise<Metadata> {
  const paramsResult = parseParams(await props.params)
  if (paramsResult.error) {
    return {}
  }

  const bridgeSearchParams = parseBridgeSearchParams(await props.searchParams)
  const { story } = await getStory(
    paramsResult.value.slugs,
    bridgeSearchParams,
  )
  const content = story.content as {
    meta_title?: string
    meta_description?: string
    og_image?: { filename?: string }
  }

  return {
    title: content.meta_title || story.name,
    description: content.meta_description || undefined,
    openGraph: content.og_image?.filename
      ? { images: [content.og_image.filename] }
      : undefined,
  }
}

export default async function DynamicPage(props: DynamicPageProps) {
  const paramsResult = parseParams(await props.params)

  if (paramsResult.error) {
    throw new Error(
      `Failed to parse params: the folders in the app directory are likely misconfigured ${formatResult(paramsResult)}`,
    )
  }

  const bridgeSearchParams = parseBridgeSearchParams(await props.searchParams)

  const { story } = await getStory(paramsResult.value.slugs, bridgeSearchParams)

  // Parsing: uncomment the lines below to perform runtime validation of the story content
  // const contentResult = parseContent(story.content)
  // if (contentResult.error) {
  //   throw new Error(
  //     `Failed to parse story content: ${formatResult(contentResult)}`,
  //   )
  // }
  // story.content = contentResult.value

  return (
    <StoryblokStory
      story={story}
      bridgeOptions={{
        resolveRelations,
      }}
    />
  )
}
