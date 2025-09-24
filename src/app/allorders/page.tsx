import React from 'react'
import Image from 'next/image'
import { getUserOrders } from '@/apis/getUserOrders'
import { Orders, Order, CartItem } from '@/types/orders.type'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(amount)
}

function formatDate(iso: string) {
  const date = new Date(iso)
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
  }).format(date)
}

const StatusBadges = ({ order }: { order: Order }) => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge variant={order.isPaid ? 'default' : 'secondary'}>{order.isPaid ? 'Paid' : 'Unpaid'}</Badge>
    <Badge variant={order.isDelivered ? 'default' : 'secondary'}>{order.isDelivered ? 'Delivered' : 'Not delivered'}</Badge>
    <Badge variant="outline">{order.paymentMethodType}</Badge>
  </div>
)

const OrderItemRow = ({ item }: { item: CartItem }) => {
  const subtotal = item.count * item.price
  const subcategoryNames = item.product.subcategory?.map(s => s.name).join(', ')

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="h-20 w-20 overflow-hidden rounded-md border bg-muted">
        <Image
          src={item.product.imageCover}
          alt={item.product.title}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-medium leading-none">{item.product.title}</p>
            <p className="text-muted-foreground text-sm">
              {item.product.brand?.name} • {item.product.category?.name}
              {subcategoryNames ? ` • ${subcategoryNames}` : ''}
            </p>
            <p className="text-muted-foreground text-xs">Rating {item.product.ratingsAverage} ({item.product.ratingsQuantity})</p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground text-sm">{item.count} × {formatCurrency(item.price)}</p>
            <p className="font-medium">{formatCurrency(subtotal)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const Allorders = async () => {
  const data: Orders = await getUserOrders()

  if (!data || data.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>No orders yet</CardTitle>
            <CardDescription>Your orders will appear here after you complete a purchase.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/" className="text-primary hover:underline">Continue shopping</Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Your orders</h1>
        <p className="text-muted-foreground">A detailed view of all your recent orders.</p>
      </div>

      <div className="flex flex-col gap-6">
        {data.map((order) => (
          <Card key={order._id}>
            <CardHeader className="gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle>Order #{order._id.slice(-8).toUpperCase()}</CardTitle>
                  <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
                </div>
                <StatusBadges order={order} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Order summary</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span>Items</span><span>{order.cartItems.length}</span></div>
                    <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(order.taxPrice)}</span></div>
                    <div className="flex justify-between"><span>Shipping</span><span>{formatCurrency(order.shippingPrice)}</span></div>
                    <Separator />
                    <div className="flex justify-between font-medium"><span>Total</span><span>{formatCurrency(order.totalOrderPrice)}</span></div>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Shipping address</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{order.shippingAddress.details}</p>
                    <p>{order.shippingAddress.city}</p>
                    <p>{order.shippingAddress.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium">Customer</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>{order.user?.name}</p>
                    <p>{order.user?.email}</p>
                    <p>{order.user?.phone}</p>
                    {order.paidAt ? <p>Paid at {formatDate(order.paidAt)}</p> : null}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <p className="mb-3 text-sm font-medium">Items</p>
                <div className="divide-y">
                  {order.cartItems.map((item) => (
                    <OrderItemRow key={item._id} item={item} />
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-muted-foreground text-sm">Updated {formatDate(order.updatedAt)}</p>
              <Link href={`/orders/${order._id}`} className="text-primary hover:underline">View details</Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Allorders