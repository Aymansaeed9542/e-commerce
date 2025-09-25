
"use client"
import { getUserWishlist } from '@/apis/getUserWishlist'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Eye, Trash2, Star, ArrowLeft, Loader2 } from 'lucide-react'
import { WishlistResponse, WishlistProduct } from '@/types/wishlist.type'
// removed redirect; client-side flow handles unauth state visually
import ProductPreviewModal from '../_components/ProductPreviewModal/ProductPreviewModal'
import { toast } from 'sonner'
import { deleteProductFromWishlistAction, DeleteWishlistResponse } from '@/wishlistActions/deleteProductFromWishlist'
import DeleteFromWishlist from '../_components/deleteProductFromWishlist/deleteFromWishlist'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

const WishlistCard = ({ product, onRemove }: { product: WishlistProduct, onRemove: (id: string) => void }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const subcategoryNames = product.subcategory?.map(s => s.name).join(', ')

  async function handleDelete() {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      const res: DeleteWishlistResponse = await deleteProductFromWishlistAction(product._id)
      if (res.status === 'success') {
        toast.success('Removed from wishlist', { position: 'top-center' })
        onRemove(product._id)
      } else {
        toast.error('Failed to remove item')
      }
    } catch (e) {
      toast.error('Failed to remove item')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="group h-full overflow-hidden border-0 shadow-sm hover:shadow-2xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <div className="relative">
        <Link href={`/productDetails/${product._id}`} className="block">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white"
                  onClick={(e) => { e.preventDefault(); setIsPreviewOpen(true) }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                {product.category?.name}
              </Badge>
            </div>
          </div>
        </Link>
      </div>
      <CardContent className="px-5">
        <div className="flex flex-col h-full gap-3">
          <Link href={`/productDetails/${product._id}`} className="block">
            <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {product.title}
            </h3>
          </Link>
          <div className="flex flex-col gap-2 min-h-[140px]">
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-muted-foreground">
                {product.brand?.name} • {product.category?.name}
              </p>
              {subcategoryNames && (
                <p className="text-xs text-muted-foreground">
                  {subcategoryNames}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">{product.ratingsAverage}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>
          </div>
          <div className="mt-auto flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold text-primary leading-none">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground line-through">
                {formatCurrency(product.price * 1.3)}
              </span>
            </div>
            <DeleteFromWishlist
              id={product._id}
              size="sm"
              onDeleted={() => onRemove(product._id)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <div className="w-full space-y-2">
          <Button className="w-full" size="sm" asChild>
            <Link href={`/productDetails/${product._id}`}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Link>
          </Button>
          <Button variant="outline" className="w-full" size="sm" onClick={() => setIsPreviewOpen(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Quick View
          </Button>
        </div>
      </CardFooter>
      {isPreviewOpen && (
        <ProductPreviewModal
          product={{
            id: Number(product._id) || 0,
            title: product.title,
            imageCover: product.imageCover,
            price: product.price,
            ratingsAverage: product.ratingsAverage,
            category: product.category,
          }}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </Card>
  )
}

const Wishlist = () => {
  const [products, setProducts] = useState<WishlistProduct[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        const data: WishlistResponse = await getUserWishlist()
        if (!isMounted) return
        setProducts(data?.data || [])
      } catch (e) {
        console.log(e)
        setError('Please login to view your wishlist')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    load()
    return () => { isMounted = false }
  }, [])

  const count = products?.length || 0

  function handleRemove(id: string) {
    setProducts(prev => (prev || []).filter(p => p._id !== id))
  }

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="flex items-center justify-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading wishlist...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="text-xl font-semibold mb-2">{error}</h2>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    )
  }

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
              <Link href="/brands">Browse Brands</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
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
              {count} {count === 1 ? 'item' : 'items'} saved for later
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              <Heart className="h-3 w-3 mr-1" />
              {count} items
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <WishlistCard key={product._id} product={product} onRemove={handleRemove} />
        ))}
      </div>

      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Items in your wishlist are saved for 30 days
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={() => toast.info('Coming soon')}>Clear All</Button>
            <Button size="sm" onClick={() => toast.info('Coming soon')}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wishlist