    "use client"

import { addProductToCard } from '@/cartActions/addProductToCart'
import { Button } from '@/components/ui/button'
import { cartContext } from '@/context/cartContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

const AddProductBtn = ({id}:{id:string}) => {
    const {addProduct} = useContext(cartContext)

    async function addToCart(id:string){
    
        const data = await addProduct?.(id)
            console.log(data);

            if(data.status === "success"){
                toast.success("added to cart successfully",{
                    duration:3000,
                    position:"top-center"
                })

            }
            else{
                toast.error("can't add the product",{
                    duration:3000,
                    position:"top-center"
            })
            
        
        
    }
}

return (
                <Button  onClick={()=>addToCart(id)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </Button>
  )
}

export default AddProductBtn