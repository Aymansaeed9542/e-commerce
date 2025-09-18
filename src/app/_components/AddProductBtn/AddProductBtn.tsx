    "use client"

import { addProductToCard } from '@/cartActions/addProductToCart'
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner'

const AddProductBtn = ({id}:{id:string}) => {


    async function addToCart(){
        const data = await addProductToCard(id)
        console.log(data);
        if(data.status==="success"){
            toast.success("Product added Successfuly",{
                duration : 3000,
                position : "top-center"
            }
        )
        }
        else{
            toast.error("Faild to add Product",{
                duration : 3000,
                position : "top-center"
            })
        }
        
    }

  return (
                <Button  onClick={addToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </Button>
  )
}

export default AddProductBtn