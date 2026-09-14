import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { CustomerContent, TestimonialContent } from '../content'
import { isResolvedStory } from '../delivery-api'
import { backgroundColor } from './backgroundColorClass'
import Customer from './Customer'

export type TestimonialProps = {
  blok: TestimonialContent
}

/** Renders `rating` ('1' to '5') as stars, or nothing when it isn't set. */
function Rating(props: { rating: string }) {
  const value = Math.round(Number(props.rating))

  if (!Number.isFinite(value) || value < 1) {
    return null
  }

  const filled = Math.min(value, 5)

  return (
    <div
      className="text-stone-900 text-base leading-none tracking-[2px]"
      role="img"
      aria-label={`${filled} out of 5`}
    >
      <span aria-hidden="true">
        {'★'.repeat(filled)}
        {'☆'.repeat(5 - filled)}
      </span>
    </div>
  )
}

function Testimonial(props: TestimonialProps) {
  return (
    <div
      className="flex flex-col items-start gap-6 p-12 flex-1 rounded-[12px] bg-white"
      {...storyblokEditable(props.blok)}
    >
      <Rating rating={props.blok.rating} />
      <p className="self-stretch justify-start text-stone-900 text-base font-normal leading-normal">
        “{props.blok.quote}”
      </p>
      {isResolvedStory<CustomerContent>(props.blok.customer) ? (
        <div className="self-stretch">
          <Customer blok={props.blok.customer.content} />
        </div>
      ) : (
        <div className="self-stretch flex gap-5">
          {props.blok.image ? (
            <div
              className={`aspect-[1/1] shrink-0 w-[44px] h-[44px] overflow-hidden rounded-full ${backgroundColor(
                props.blok.imageBackgroundColor,
              )}`}
            >
              <NextImage
                className="object-cover w-full h-full "
                src={props.blok.image?.filename}
                alt={props.blok.image?.alt ?? ''}
                width={100}
                height={100}
              />
            </div>
          ) : null}
          <div className="flex flex-col">
            <div className="justify-start text-stone-900 text-base font-bold font-['Inter']">
              {props.blok.name}
            </div>
            <div className="justify-start text-stone-900 text-base font-normal leading-normal">
              {props.blok.title}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Testimonial
