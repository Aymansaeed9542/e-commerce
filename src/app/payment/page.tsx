  "use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cartContext } from '@/context/cartContext'
import { cashPaymentAction } from '@/paymentActions/cashPayment'
import React, { useContext, useRef } from 'react'
import { toast } from 'sonner'

const Payment = () => {
 const {cartId , products , totalCartPrice , afterPayment} = useContext(cartContext)!


   async function cashPayment(){

    const values = {
      shippingAddress:{
          details: details.current?.value || "",
          phone: phone.current?.value || "",
          city: city.current?.value || ""
          }  
  }
    try {
      const data = await cashPaymentAction(cartId as string , values)
       if(data?.status === "success"){
                      toast.success("Successful Process",{
                          duration:3000,
                          position:"top-center"
                      })
                  } else {
                      toast.error("there is something wrong",{
                          duration:3000,
                          position:"top-center"
                      })
                  }

                  afterPayment()


    } catch (error) {
      console.log(error);
      
      
    } 
  }

  const details =useRef<HTMLInputElement>(null)
  const phone =useRef<HTMLInputElement>(null)
  const city =useRef<HTMLInputElement>(null)

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="text-sm text-muted-foreground">Provide your shipping details to place a cash order.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping address</CardTitle>
              <CardDescription>We’ll deliver your order to this address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="details">Address details</Label>
                <Input id="details" type="text" placeholder='Street, building, apartment' ref={details} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="text" placeholder='(+1) 555-123-4567' ref={phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" type="text" placeholder='e.g., New York' ref={city} />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex flex-col md:flex-row'>
              <Button className="w-full mb-3 me-17" onClick={cashPayment}>Cash Payment</Button>
              <Button className="w-full">Cash Payment</Button>
              </div>

            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order summary</CardTitle>
              <CardDescription>Overview of your items and totals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {products && products.length > 0 ? (
                  products.map((item: { _id: string; product: { imageCover: string; title: string }; count: number; price: number }) => (
                    <div key={item._id} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="size-12 rounded-md object-cover border"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{item.product.title}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.count}</p>
                        </div>
                      </div>
                      <div className="text-sm whitespace-nowrap">${item.price}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                )}
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalCartPrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex items-center justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>${totalCartPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

  )
}

export default Payment