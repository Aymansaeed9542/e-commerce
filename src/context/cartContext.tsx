"use client"

import { addProductToCard } from '@/cartActions/addProductToCart'
import { clearAllProductsAction } from '@/cartActions/clearAllProducts'
import { deleteProductAction } from '@/cartActions/deleteProductFromCart'
import { getUserCartDataAction } from '@/cartActions/getUserCartData'
import { updateProductCountAction } from '@/cartActions/updateProductCount'
import { Cart, CartContextType } from '@/types/cart.type'
import { useSession } from 'next-auth/react'
import React, { createContext, useEffect, useState } from 'react'


export const cartContext = createContext<CartContextType| undefined>(undefined)

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
  console.log("Cart API Response:", data);
        } catch (error) {
            console.log(error);
            setisLoading(false)
        }
    }
    

    async function addProduct(id:string){
            setisLoading(true)

        try {
                const data = await addProductToCard(id)
                setnumOfCartItems(data.numOfCartItems)
                setproducts(data.data.products)
                settotalCartPrice(data.data.totalCartPrice)  
setisLoading(false)
    console.log(data);
    return data                   

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
    return data
        } catch (error) {
            console.log(error);
            setisLoading(false)
        }
    }


    async function updateProductCount(id : string , count : number){
        try {
            const data = await updateProductCountAction(id , count)
                setnumOfCartItems(data.numOfCartItems)
                setproducts(data.data.products)
                settotalCartPrice(data.data.totalCartPrice)
                                console.log(data);
             return data
             
        } catch (error) {
                        console.log(error);
        } 
    }


    async function clearAllProducts(){
        setisLoading(true)

        try {
            const data = await clearAllProductsAction()
            
            // After clearing all products, reset cart state to empty
            setnumOfCartItems(0)
            setproducts([])
            settotalCartPrice(0)
            setisLoading(false)

            return data
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
        deleteProduct,
        addProduct ,
        updateProductCount,
        clearAllProducts
    }}>
        {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider