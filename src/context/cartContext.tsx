"use client"

import { getUserCartDataAction } from '@/cartActions/getUserCartData'
import { Cart } from '@/types/cart.type'
import React, { createContext, useEffect, useState } from 'react'


const cartContext = createContext({})

const  CartContextProvider = ({children}:{children:React.ReactNode}) => {
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const [products, setproducts] = useState<Cart['data']['products']>([])
    const [totalCartPrice, settotalCartPrice] = useState(0)


    async function getCartData(){

        try {
                const data : Cart = await getUserCartDataAction()
                setnumOfCartItems(data.numOfCartItems)
                setproducts(data.data.products)
                settotalCartPrice(data.data.totalCartPrice)

    console.log(data);
        } catch (error) {
            console.log(error);
            
        }

    }

        useEffect(function(){
                getCartData()
    },[])

  return (
    <cartContext.Provider  value={{

        numOfCartItems,
        products,
        totalCartPrice
    }}>
        {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider