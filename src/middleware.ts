import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
const {pathname} = request.nextUrl
const routes = ["/", "/brands" , "/categories" , "/cart" , "/productDetails", "/payment" , "allOrders"]
const authPages = ["/login" ,"/register"]

const token = await getToken({req : request})
if(!token && routes.includes(pathname) ){
  return NextResponse.redirect(new URL('/login' , request.url))

}
if(token && authPages.includes(pathname) ){
  return NextResponse.redirect(new URL('/' , request.url))

}

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/brands" , "/categories" , "/cart" , "/productDetails","/login" ,"/register" , "/payment" , "allOrders"],
}