"use client"

import { deleteProductAction } from '@/cartActions/deleteProductFromCart'
import { getUserCartDataAction } from '@/cartActions/getUserCartData'
import { Cart, CartContextType } from '@/types/cart.type'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'


export const cartContext = createContext<CartContextType>({
  isLoading: false,
  numOfCartItems: 0,
  products: [],
  totalCartPrice: 0,
  
})

const  CartContextProvider = ({children}:{children:React.ReactNode}) => {
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [products, setproducts] = useState<Cart['data']['products']>([])
    const [totalCartPrice, settotalCartPrice] = useState(0)
    const [isLoading, setisLoading] = useState(false)

    async function getCartData(){
                    setisLoading(true)

        try {
                const data : Cart = await getUserCartDataAction()
                setnumOfCartItems(data.numOfCartItems)
                setproducts(data.data.products)
                settotalCartPrice(data.data.totalCartPrice)                     

setisLoading(false)
    console.log(data);
        } catch (error) {
            console.log(error);
            setisLoading(false)
        }
    }
    




        async function deleteProduct(id :string) {
                    setisLoading(true)

        try {
                const data : Cart = await deleteProductAction(id)
                setnumOfCartItems(data.numOfCartItems)
                setproducts(data.data.products)
                settotalCartPrice(data.data.totalCartPrice)                     

setisLoading(false)
    console.log(data);
        } catch (error) {
            console.log(error);
            setisLoading(false)
        }
    }


        useEffect(function(){
                getCartData()
    },[])




  return (
    <cartContext.Provider  value={{
        isLoading,
        numOfCartItems,
        products,
        totalCartPrice,
        deleteProduct
    }}>
        {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider