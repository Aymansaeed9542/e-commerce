"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import AddProductBtn from "../AddProductBtn/AddProductBtn"
import { Star, Heart, Eye, ShoppingCart, Share2, Zap, Loader2 } from "lucide-react"
import { useState, useContext } from "react"
import ProductPreviewModal from "../ProductPreviewModal/ProductPreviewModal"
import { cartContext } from "@/context/cartContext"
import { toast } from "sonner"

type Product = {
  imageCover: string
  images?: string[]
  category: { name: string }
  title: string
  price: number
  ratingsAverage: number
  id: number
  description?: string
}

const HomeCard =({ product }: { product: Product })  => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isQuickView, setIsQuickView] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isQuickAdding, setIsQuickAdding] = useState(false)
  
  const cartContextValue = useContext(cartContext)
  const { addProduct } = cartContextValue || { addProduct: undefined }

  const handleQuickAdd = async () => {
    if (!addProduct) return
    
    setIsQuickAdding(true)
    
    try {
      const data = await addProduct(product.id.toString())
      
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
      setIsQuickAdding(false)
    }
  }
  
  return (
    <div className="group h-full">
      <Card className="h-full overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm card-hover">
        <div className="relative">
          <Link href={`/productDetails/${product.id}`} className="block">
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image 
                width={500} 
                height={500} 
                src={product.imageCover} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Quick Actions Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500">
                {/* Wishlist Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      setIsWishlisted(!isWishlisted)
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
                      isWishlisted 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-900 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                    {/* Quick View Button */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          setIsPreviewModalOpen(true)
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                
                {/* Share Button */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
                  <button 
                    onClick={(e) => {
                      e.preventDefault()
                      navigator.share?.({ title: product.title, url: window.location.href })
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-900 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute bottom-3 left-3">
                <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-lg">
                  {product.category?.name || "Category"}
                </span>
              </div>
              
              {/* Sale Badge */}
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                  <Zap className="h-3 w-3 mr-1" />
                  SALE
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <Link href={`/productDetails/${product.id}`} className="block">
              <h3 className="font-semibold text-lg text-card-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors duration-200 leading-tight">
                {product.title}
              </h3>
            </Link>
            
            {/* Rating & Reviews */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-card-foreground">
                    {product.ratingsAverage}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">127 reviews</span>
              </div>
            </div>
            
            {/* Price Section */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary">
                  ${product.price}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                  Save ${(product.price * 0.3).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <div className="w-full space-y-3">
            {/* Add to Cart Button */}
            <AddProductBtn id={product.id.toString()} />
            
            {/* Additional Actions */}
            <div className="flex gap-2">
              <button 
                onClick={handleQuickAdd}
                disabled={isQuickAdding}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isQuickAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4" />
                    Quick Add
                  </>
                )}
              </button>
                  <button 
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>
            </div>
          </div>
        </CardFooter>
      </Card>
      
      {/* Product Preview Modal */}
      <ProductPreviewModal
        product={product}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </div>
  )
}

export default HomeCard