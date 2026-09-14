import * as React from 'react'
import { storyblokEditable } from '@storyblok/react/rsc'
import AppBar from '../components/AppBar'
import Footer from '../components/Footer'
import type { ProductPageContent } from '../content'
import Content from './Content'
import ProductVariant from './ProductVariant'

export type ProductPageProps = {
  blok: ProductPageContent
}

/**
 * Storyblok delivers datetimes as `YYYY-MM-DD HH:mm`. Only the date half is
 * used, read as UTC so the server and the bridge's client re-render agree.
 */
const parseLaunchDate = (value: string | undefined): Date | undefined => {
  if (!value) {
    return undefined
  }
  const date = new Date(`${value.slice(0, 10)}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? undefined : date
}

const formatLaunchDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })

function ProductPage(props: ProductPageProps) {
  const launchDate = parseLaunchDate(props.blok.launch_date)
  // No launch date means the product is already on sale.
  const launched = launchDate === undefined || launchDate.getTime() <= Date.now()

  return (
    <div
      className="flex flex-col items-stretch"
      {...storyblokEditable(props.blok)}
    >
      <AppBar />
      {props.blok.body?.map((content, index) => (
        <Content
          blok={content}
          key={index}
        />
      ))}
      {props.blok.variants?.length ? (
        <section className="self-stretch px-5 py-10 md:px-20 md:py-16 bg-white items-center flex flex-col">
          <div className="max-w-3xl w-full flex flex-col">
            {props.blok.variants.map((variant) => (
              <ProductVariant
                key={variant._uid}
                blok={variant}
                showPrice={launched}
              />
            ))}
            {!launched && launchDate ? (
              <p className="pt-4 text-[#44474A] text-sm leading-6 font-inter">
                Available{' '}
                <time dateTime={props.blok.launch_date?.slice(0, 10)}>
                  {formatLaunchDate(launchDate)}
                </time>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
      <Footer />
    </div>
  )
}

export default ProductPage
