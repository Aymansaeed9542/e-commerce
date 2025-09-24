export interface BrandEntity {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandsResponse {
  results?: number
  metadata?: unknown
  data: BrandEntity[]
}

export interface SpecificBrandResponse {
  data: BrandEntity
}


