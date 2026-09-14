import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import type { ColorwayContent, ProductVariantContent } from '../content'
import { isResolvedStory } from '../delivery-api'
import Colorway from './Colorway'

export type ProductVariantProps = {
  blok: ProductVariantContent
  /** Prices are withheld until the product's launch date has passed. */
  showPrice?: boolean
}

/**
 * Storyblok number fields arrive as strings; fall back to the raw value if it
 * isn't numeric so an editor's typo shows up instead of `NaN`.
 */
const formatPrice = (price: string): string => {
  const amount = Number(price)
  return Number.isFinite(amount) && price !== ''
    ? `$${amount.toLocaleString('en-US')}`
    : price
}

function ProductVariant(props: ProductVariantProps) {
  return (
    <div
      className="flex items-center justify-between gap-6 border-b border-stone-200 py-3 last:border-b-0"
      {...storyblokEditable(props.blok)}
    >
      {isResolvedStory<ColorwayContent>(props.blok.colorway) ? (
        <Colorway blok={props.blok.colorway.content} />
      ) : null}
      {props.showPrice && props.blok.price ? (
        <span className="text-stone-900 text-base font-semibold font-inter">
          {formatPrice(props.blok.price)}
        </span>
      ) : null}
    </div>
  )
}

export default ProductVariant
