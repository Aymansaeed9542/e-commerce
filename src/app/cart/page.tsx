"use client"
import React, { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Minus, Plus, Trash2, ShoppingCart } from 'lucide-react'
import { cartContext } from '@/context/cartContext'
import Image from 'next/image'


const Cart = () => {
  const { isLoading, products, numOfCartItems, totalCartPrice, deleteProduct } = useContext(cartContext)  
      
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    )
  }

    async function removeProduct(id:string){
      const data = await deleteProduct?.(id)
      console.log(data);
      
    }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1>
            </div>
            
            {/* Total Cart Price */}
            <div className="bg-primary/10 rounded-lg px-4 py-3 border border-primary/20">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total Cart Value:</span>
                <span className="text-2xl font-bold text-primary">
                  ${totalCartPrice.toFixed(2)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {numOfCartItems} item{numOfCartItems !== 1 ? 's' : ''} in cart
              </p>
            </div>
          </div>
          
          <p className="text-muted-foreground mt-4">
            Review your items and proceed to checkout
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {numOfCartItems === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground mb-6">
                    Looks like you haven not added any items to your cart yet.
                  </p>
                  <Button className="px-8">
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Clear All Button */}
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Cart Items ({numOfCartItems})
                  </h2>
                  <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-white">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4">
                  {products.map((product , idx) => (
                    <Card key={idx} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Product Image */}
                          <div className="sm:w-48 h-48 sm:h-32 bg-muted flex items-center justify-center overflow-hidden">
                            <Image 
                              src={product.product.imageCover} 
                              alt={product.product.title}
                              width={200} 
                              height={200}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product Details */}
                          <div className="flex-1 p-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{product.product.title}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-muted-foreground text-sm">
                                    Rating: {product.product.ratingsAverage.toFixed(1)} ⭐
                                  </span>
                                  <span className="text-muted-foreground text-sm">
                                    • {product.product.brand.name}
                                  </span>
                                </div>
                                <p className="text-xl font-bold text-primary">
                                  ${product.price.toFixed(2)}
                                </p>
                              </div>
                              
                              {/* Quantity Controls and Actions */}
                              <div className="flex flex-col sm:flex-row items-center gap-4">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  
                                  <div className="min-w-[3rem] text-center">
                                    <span className="text-lg font-semibold">
                                      {product.count}
                                    </span>
                                  </div>
                                  
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-9 w-9"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                
                                {/* Delete Button */}
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={()=>deleteProduct?.(product.product.id)}
                                  className="h-9 w-9 text-destructive hover:bg-destructive hover:text-white"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Summary Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${totalCartPrice.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${totalCartPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </div>

                {/* Promo Code */}
                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                      <Button variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart