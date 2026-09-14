import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { CustomerContent } from '../content'

export type CustomerProps = {
  blok: CustomerContent
}

/**
 * A customer profile, stored once in the `customers/` folder and referenced
 * from every testimonial that quotes them.
 */
function Customer(props: CustomerProps) {
  const subtitle = [props.blok.title, props.blok.location]
    .filter(Boolean)
    .join(', ')

  return (
    <div
      className="flex gap-5"
      {...storyblokEditable(props.blok)}
    >
      {props.blok.image ? (
        <div className="aspect-[1/1] shrink-0 w-[44px] h-[44px] overflow-hidden rounded-full bg-neutral-100">
          <NextImage
            className="object-cover w-full h-full"
            src={props.blok.image.filename}
            alt={props.blok.image.alt ?? ''}
            width={100}
            height={100}
          />
        </div>
      ) : null}
      <div className="flex flex-col">
        <div className="justify-start text-stone-900 text-base font-bold font-['Inter']">
          {props.blok.name}
        </div>
        {subtitle ? (
          <div className="justify-start text-stone-900 text-base font-normal leading-normal">
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Customer
