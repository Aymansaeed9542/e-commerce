
import { getUserWishlist } from '@/apis/getUserWishlist'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Eye, Trash2, Star, ArrowLeft } from 'lucide-react'
import { WishlistResponse, WishlistProduct } from '@/types/wishlist.type'
import { redirect } from 'next/navigation'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

const WishlistCard = ({ product }: { product: WishlistProduct }) => {
  const subcategoryNames = product.subcategory?.map(s => s.name).join(', ')

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        <Link href={`/productDetails/${product._id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Quick Actions */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-8 w-8 p-0 rounded-full"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Category Badge */}
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                {product.category?.name}
              </Badge>
            </div>
          </div>
        </Link>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <Link href={`/productDetails/${product._id}`} className="block">
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {product.title}
            </h3>
          </Link>
          
          {/* Brand & Subcategory */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {product.brand?.name} • {product.category?.name}
            </p>
            {subcategoryNames && (
              <p className="text-xs text-muted-foreground">
                {subcategoryNames}
              </p>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">{product.ratingsAverage}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.price * 1.3)}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-2">
          <Button className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" className="w-full" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

const Wishlist = async () => {
  try {
    const data: WishlistResponse = await getUserWishlist()
    const products = data?.data || []

    if (!products || products.length === 0) {
      return (
        <div className="container mx-auto max-w-6xl px-4 py-8">
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Save items you love by clicking the heart icon. They will appear here for easy access.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shopping
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
              <p className="text-muted-foreground">
                {products.length} {products.length === 1 ? 'item' : 'items'} saved for later
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                <Heart className="h-3 w-3 mr-1" />
                {products.length} items
              </Badge>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <WishlistCard key={product._id} product={product} />
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              Items in your wishlist are saved for 30 days
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                Clear All
              </Button>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    // If user is not authenticated, redirect to login
    console.log(error);
    
    redirect('/login')
  }
}

export default Wishlist