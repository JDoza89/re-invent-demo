import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import NextImage from 'next/image'
import type { GalleryContent } from '../content'

export type GalleryProps = {
  blok: GalleryContent
}

function Gallery(props: GalleryProps) {
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {props.blok.images?.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <NextImage
                src={image.filename}
                alt={image.alt ?? ''}
                width={600}
                height={600}
                className="absolute h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gallery
