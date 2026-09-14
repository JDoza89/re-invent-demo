import type {
  AssetContent,
  BlockContent,
  LinkContent,
  RichTextContent,
  TableContent,
  Story,
} from '../delivery-api'

export type Content =
  | UnknownContent
  | PageContent
  | ProductPageContent
  | ColorwayContent
  | CustomerContent
  | ProductVariantContent
  | RelatedProductsContent
  | TestimonialContent
  | TestimonialsContent
  | CardsContent
  | CardContent
  | HeroContent
  | TabsContent
  | TabContent
  | TeamMembersContent
  | TeamMemberContent
  | ButtonContent
  | GalleryContent
  | EmailSignupContent
  | SpecTableContent

/**
 * When the parsing of a component fails, fall back fack to this component.
 * Parsing could fail for several reasons; for example,
 * 1. You changed the schema of a component without updating the content.
 * 2. You have modeled the content incorrectly in your type alias and parser
 */
export type UnknownContent = BlockContent<{
  component: 'unknown'
}>

export type PageContent = BlockContent<{
  component: 'page'
  body: Content[]
  meta_title?: string
  meta_description?: string
  og_image?: AssetContent
}>

export type ProductPageContent = BlockContent<{
  component: 'productPage'
  body: Content[]
  /** `YYYY-MM-DD HH:mm` from Storyblok's datetime field. */
  launch_date?: string
  variants: ProductVariantContent[]
  meta_title?: string
  meta_description?: string
  og_image?: AssetContent
}>

export type ColorwayContent = BlockContent<{
  component: 'colorway'
  name: string
  swatch?: AssetContent
}>

export type CustomerContent = BlockContent<{
  component: 'customer'
  name: string
  title: string
  location: string
  image?: AssetContent
}>

export type ProductVariantContent = BlockContent<{
  component: 'productVariant'
  colorway?: Story & {
    content: ColorwayContent
  }
  /** Storyblok number fields are delivered as strings. */
  price: string
}>

/**
 * A product referenced from another product's page. Only the fields the teaser
 * card needs are parsed, so this doesn't recurse into the whole page body.
 */
export type RelatedProductContent = {
  uuid: string
  name: string
  full_slug: string
  content: {
    meta_description?: string
    og_image?: AssetContent
  }
}

export type RelatedProductsContent = BlockContent<{
  component: 'relatedProducts'
  title: string
  products: RelatedProductContent[]
}>

export type BackgroundColor =
  | 'beige'
  | 'white'
  | 'grey'
  | 'purple'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'pink'
  | 'blue'

export type TestimonialContent = BlockContent<{
  component: 'testimonial'
  quote: string
  image?: AssetContent
  name: string
  title: string
  imageBackgroundColor: BackgroundColor
  /**
   * A profile in the `customers/` folder. When set it replaces the inline
   * name, title and image above, which stay for testimonials authored before
   * customer profiles existed.
   */
  customer?: Story & {
    content: CustomerContent
  }
  /** `'1'` to `'5'`, empty when the testimonial isn't a rated review. */
  rating: string
}>

export type TestimonialsContent = BlockContent<{
  component: 'testimonials'
  title: string
  description: string
  testimonials: Content[]
}>

export type CardsContent = BlockContent<{
  component: 'cards'
  title: string
  description: RichTextContent
  cards: CardContent[]
}>

export type CardContent = BlockContent<{
  component: 'card'
  title: string
  description: RichTextContent
  icon?: AssetContent
}>

export type HeroContent = BlockContent<{
  component: 'hero'
  image?: AssetContent
  imagePadding: boolean
  textAlignment: 'left' | 'right' | 'center'
  description: RichTextContent
  backgroundColor: BackgroundColor
  buttons: ButtonContent[]
}>

export type TabsContent = BlockContent<{
  component: 'tabs'
  description: RichTextContent
  tabs: TabContent[]
}>

export type TabContent = BlockContent<{
  component: 'tab'
  title: string
  content: Content[]
}>

export type TeamMemberContent = BlockContent<{
  component: 'teamMember'
  name: string
  title: string
  image?: AssetContent
  backgroundColor: BackgroundColor
}>

export type TeamMembersContent = BlockContent<{
  component: 'teamMembers'
  description: RichTextContent
  teamMembers: (Story & {
    content: TeamMemberContent
  })[]
}>

export type ButtonContent = BlockContent<{
  component: 'button'
  text: string
  link?: LinkContent
  color: 'primary' | 'secondary'
}>

export type GalleryContent = BlockContent<{
  component: 'gallery'
  title: string
  images: AssetContent[]
}>

export type EmailSignupContent = BlockContent<{
  component: 'emailSignup'
  heading: string
  description: string
  buttonText: string
  successMessage: string
}>

export type SpecTableContent = BlockContent<{
  component: 'specTable'
  title: string
  specs: TableContent
  spec_sheet?: AssetContent
}>
