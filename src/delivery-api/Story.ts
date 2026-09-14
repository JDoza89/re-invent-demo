import { object, parseString, parseUnknown } from 'pure-parse'

export type Story = {
  uuid: string
  content: unknown
}

export const parseStory = object<Story>({
  uuid: parseString,
  content: parseUnknown,
})

/**
 * A story reference is delivered as a bare uuid string unless its field is
 * listed in the request's `resolve_relations`. Components use this to skip a
 * reference that didn't resolve instead of reading `content` off a string.
 */
export const isResolvedStory = <T>(
  reference: unknown,
): reference is Story & { content: T } =>
  typeof reference === 'object' &&
  reference !== null &&
  'content' in reference &&
  typeof (reference as { content: unknown }).content === 'object' &&
  (reference as { content: unknown }).content !== null
