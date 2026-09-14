import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import Link from 'next/link'
import NextImage from 'next/image'
import type { RelatedProductsContent } from '../content'
import { isResolvedStory } from '../delivery-api'

export type RelatedProductsProps = {
  blok: RelatedProductsContent
}

function RelatedProducts(props: RelatedProductsProps) {
  // References that weren't resolved arrive as bare uuid strings; skip them.
  const products =
    props.blok.products?.filter((product) => isResolvedStory(product)) ?? []

  return (
    <div
      className="self-stretch px-5 py-10 md:px-20 md:py-24 bg-white items-center flex flex-col"
      {...storyblokEditable(props.blok)}
    >
      <div className="max-w-6xl w-full flex flex-col gap-6">
        {props.blok.title ? (
          <h2 className="text-2xl md:text-3xl leading-tight tracking-[-0.3px] font-extrabold text-[#1F1F1F] font-inter">
            {props.blok.title}
          </h2>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <Link
              key={product.uuid}
              href={`/${product.full_slug}`}
              className="flex flex-col gap-3 rounded-[20px] bg-neutral-100 p-4 sm:p-6 transition-colors duration-300 ease-in-out hover:bg-stone-200"
            >
              {product.content.og_image ? (
                <div className="relative aspect-video overflow-hidden rounded-xl">
                  <NextImage
                    className="absolute h-full w-full object-cover"
                    src={product.content.og_image.filename}
                    alt={product.content.og_image.alt ?? ''}
                    width={600}
                    height={338}
                  />
                </div>
              ) : null}
              <span className="text-stone-900 text-base font-bold font-['Inter']">
                {product.name}
              </span>
              {product.content.meta_description ? (
                <span className="text-[#44474A] text-sm leading-6 font-inter">
                  {product.content.meta_description}
                </span>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
