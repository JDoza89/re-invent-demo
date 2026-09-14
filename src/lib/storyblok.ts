import Button from '@/components/Button'
import Card from '@/components/Card'
import Cards from '@/components/Cards'
import Colorway from '@/components/Colorway'
import Customer from '@/components/Customer'
import EmailSignup from '@/components/EmailSignup'
import ProductVariant from '@/components/ProductVariant'
import RelatedProducts from '@/components/RelatedProducts'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import Page from '@/components/Page'
import ProductPage from '@/components/ProductPage'
import SpecTable from '@/components/SpecTable'
import Tabs from '@/components/Tabs'
import TeamMembers from '@/components/TeamMembers'
import Testimonial from '@/components/Testimonial'
import Testimonials from '@/components/Testimonials'
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc'

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    productPage: ProductPage,
    productVariant: ProductVariant,
    relatedProducts: RelatedProducts,
    colorway: Colorway,
    customer: Customer,
    teamMembers: TeamMembers,
    testimonials: Testimonials,
    testimonial: Testimonial,
    cards: Cards,
    card: Card,
    hero: Hero,
    tabs: Tabs,
    button: Button,
    gallery: Gallery,
    emailSignup: EmailSignup,
    specTable: SpecTable,
  },
  apiOptions: {
    /** Set the correct region for your space. Learn more: https:/www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
    region: 'us',
    /** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
    endpoint: process.env.STORYBLOK_API_BASE_URL
      ? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
      : undefined,
  },
})
