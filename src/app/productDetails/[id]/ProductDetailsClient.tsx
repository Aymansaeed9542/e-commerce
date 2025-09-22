"use client"

import React, { useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Truck, 
  RotateCcw, 
  Shield, 
  ZoomIn, 
  ChevronLeft, 
  ChevronRight,
  X,
  Loader2,
  Eye,
  BarChart3
} from 'lucide-react'
import { toast } from 'sonner'
import { cartContext } from '@/context/cartContext'

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

interface ProductDetailsClientProps {
  product: Product
}

const ProductDetailsClient = ({ product }: ProductDetailsClientProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  
  const cartContextValue = useContext(cartContext)
  const { addProduct } = cartContextValue || { addProduct: undefined }

  const handleAddToCart = async () => {
    if (!addProduct || !product) return
    
    setIsAddingToCart(true)
    
    try {
      const data = await addProduct(product.id)
      
      if (data?.status === "success") {
        toast.success("Added to cart successfully", {
          duration: 3000,
          position: "top-center"
        })
      } else {
        toast.error("Failed to add product to cart", {
          duration: 3000,
          position: "top-center"
        })
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to add product to cart", {
        duration: 3000,
        position: "top-center"
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleShare = async () => {
    if (!product) return
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: `Check out this amazing product: ${product.title}`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast.success("Product link copied to clipboard", {
          duration: 2000,
          position: "top-center"
        })
      }
    } catch (error) {
      console.log("Share failed:", error)
    }
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.imageCover]

  return (
        <div className="bg-background">
          {/* Breadcrumb */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <span>/</span>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
                <span>/</span>
                <Link href={`/categories/${product.category.slug}`} className="hover:text-primary transition-colors">
                  {product.category.name}
                </Link>
                <span>/</span>
                <span className="text-foreground">{product.title}</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-muted cursor-zoom-in transition-transform duration-300 max-w-md mx-auto">
                <Image
                  src={images[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                    <ZoomIn className="h-3 w-3" />
                    Click to zoom
                  </div>
                </div>
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === 0 ? images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="h-5 w-5 mx-auto" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="h-5 w-5 mx-auto" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Fullscreen Button */}
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <Eye className="h-5 w-5 mx-auto" />
              </button>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2 justify-center">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {product.category.name}
                </Badge>
                {product.brand && (
                  <Badge variant="outline" className="text-xs">
                    {product.brand.name}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-xl lg:text-2xl font-bold text-foreground mb-2 leading-tight">
                {product.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${
                        i < Math.floor(product.ratingsAverage) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold">{product.ratingsAverage}</span>
                <span className="text-muted-foreground text-xs">({product.ratingsQuantity})</span>
              </div>
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${(product.price * 1.2).toFixed(2)}
                </span>
                <Badge className="bg-green-100 text-green-800 text-xs px-2 py-0.5">
                  Save ${(product.price * 0.2).toFixed(2)}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 min-w-[50px] text-center font-semibold text-sm">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total: <span className="font-bold text-primary">${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full h-10 text-sm font-semibold"
                size="sm"
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`h-8 text-xs ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                >
                  <Heart className={`h-3 w-3 mr-1 ${isWishlisted ? 'fill-current' : ''}`} />
                  Wishlist
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="h-8 text-xs"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  Share
                </Button>
                
                <Button
                  variant="outline"
                  className="h-8 text-xs"
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  Compare
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t">
              {[
                { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
                { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
                { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' }
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col items-center gap-1 p-2 bg-muted/30 rounded-lg text-center">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-3 w-3 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110"
            >
              <X className="h-5 w-5 mx-auto" />
            </button>
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={images[selectedImageIndex]}
                alt={product.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailsClient
