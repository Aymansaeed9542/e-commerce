"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Heart, Share2, Star, ShoppingCart, Minus, Plus, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useContext } from "react"
import { cartContext } from "@/context/cartContext"

interface Product {
  id: number
  title: string
  imageCover: string
  images?: string[]
  price: number
  ratingsAverage: number
  category?: {
    name: string
  }
  description?: string
}

interface ProductPreviewModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const ProductPreviewModal = ({ product, isOpen, onClose }: ProductPreviewModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const cartContextValue = useContext(cartContext)
  const { addProduct } = cartContextValue || { addProduct: undefined }

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen && product) {
      setSelectedImageIndex(0)
      setQuantity(1)
    }
  }, [isOpen, product])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleQuickAdd = async () => {
    if (!addProduct || !product) return
    
    setIsAddingToCart(true)
    
    try {
      const data = await addProduct(product.id.toString())
      
      if (data?.status === "success") {
        toast.success("Added to cart successfully", {
          duration: 3000,
          position: "top-center"
        })
        onClose()
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
        // Fallback: copy to clipboard
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

  if (!isOpen || !product) return null

  const images = product.images && product.images.length > 0 ? product.images : [product.imageCover]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-6xl mx-2 sm:mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
        <Card className="bg-background border-0 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b">
            <h2 className="text-lg sm:text-2xl font-bold text-foreground pr-2">{product.title}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-accent flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-120px)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={images[selectedImageIndex]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(prev => 
                          prev === 0 ? images.length - 1 : prev - 1
                        )}
                        className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <svg className="h-4 w-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(prev => 
                          prev === images.length - 1 ? 0 : prev + 1
                        )}
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                      >
                        <svg className="h-4 w-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Images */}
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
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

              {/* Product Details */}
              <div className="space-y-4 sm:space-y-6">
                {/* Price and Rating */}
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-base sm:text-lg font-semibold">{product.ratingsAverage}</span>
                      <span className="text-sm text-muted-foreground">(127 reviews)</span>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl sm:text-3xl font-bold text-primary">${product.price}</div>
                      <div className="text-sm text-muted-foreground line-through">
                        ${(product.price * 1.3).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                      Save ${(product.price * 0.3).toFixed(2)}
                    </span>
                    {product.category && (
                      <span className="text-sm text-muted-foreground">
                        in {product.category.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description || "This is a high-quality product that offers excellent value for money. Perfect for your everyday needs with premium materials and craftsmanship."}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-lg">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="h-10 w-10 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 min-w-[60px] text-center font-semibold">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="h-10 w-10 p-0"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total: <span className="font-semibold text-primary">${(product.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleQuickAdd}
                    disabled={isAddingToCart}
                    className="w-full h-10 sm:h-12 text-base sm:text-lg font-semibold"
                  >
                    {isAddingToCart ? (
                      <>
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 animate-spin" />
                        <span className="hidden sm:inline">Adding to Cart...</span>
                        <span className="sm:hidden">Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  
                  <div className="flex gap-2 sm:gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`flex-1 h-10 sm:h-11 text-sm sm:text-base ${isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : ''}`}
                    >
                      <Heart className={`h-4 w-4 mr-1 sm:mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      <span className="hidden sm:inline">{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                      <span className="sm:hidden">{isWishlisted ? 'Saved' : 'Save'}</span>
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="flex-1 h-10 sm:h-11 text-sm sm:text-base"
                    >
                      <Share2 className="h-4 w-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Share</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductPreviewModal
