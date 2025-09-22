import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import getSingleProduct from '@/apis/singleProduct'
import ProductDetailsClient from './ProductDetailsClient'

interface Product {
  id: string
  title: string
  description: string
  imageCover: string
  images: string[]
  price: number
  ratingsAverage: number
  ratingsQuantity: number
  category: {
    name: string
    slug: string
  }
  brand: {
    name: string
    slug: string
  }
  quantity: number
  sold: number
  createdAt: string
}

interface ProductDetailsProps {
  params: Promise<{ id: string }>
}

const ProductDetails = async ({ params }: ProductDetailsProps) => {
  const { id } = await params
  
  let product: Product | null = null
  let error: string | null = null
  
  try {
    product = await getSingleProduct(id)
  } catch (err) {
    console.error('Error fetching product:', err)
    error = 'Failed to load product details'
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <X className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <ProductDetailsClient product={product} />
}

export default ProductDetails