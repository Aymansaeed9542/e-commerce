export interface WishlistProduct {
  _id: string
  title: string
  imageCover: string
  price: number
  ratingsAverage: number
  ratingsQuantity: number
  category: {
    _id: string
    name: string
    slug: string
    image: string
  }
  brand: {
    _id: string
    name: string
    slug: string
    image: string
  }
  subcategory: Array<{
    _id: string
    name: string
    slug: string
    category: string
  }>
}

export interface WishlistResponse {
  status: string
  results: number
  data: WishlistProduct[]
}
