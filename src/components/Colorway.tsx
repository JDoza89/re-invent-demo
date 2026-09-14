import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { ColorwayContent } from '../content'

export type ColorwayProps = {
  blok: ColorwayContent
}

function Colorway(props: ColorwayProps) {
  return (
    <div
      className="flex items-center gap-3"
      {...storyblokEditable(props.blok)}
    >
      {props.blok.swatch ? (
        <NextImage
          className="w-8 h-8 shrink-0 rounded-full object-cover"
          src={props.blok.swatch.filename}
          alt={props.blok.swatch.alt ?? ''}
          width={32}
          height={32}
        />
      ) : null}
      <span className="text-stone-900 text-base font-normal leading-normal">
        {props.blok.name}
      </span>
    </div>
  )
}

export default Colorway
