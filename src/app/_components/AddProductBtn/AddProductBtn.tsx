    "use client"

// import { addProductToCard } from '@/cartActions/addProductToCart'
import { Button } from '@/components/ui/button'
import { cartContext } from '@/context/cartContext'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const AddProductBtn = ({id}:{id:string}) => {
    const cartContextValue = useContext(cartContext)
    const {addProduct} = cartContextValue || { addProduct: undefined }
    const [isLoading, setIsLoading] = useState(false)

    async function addToCart(id:string){
        if (!addProduct) return;
        
        setIsLoading(true);
        
        try {
            const data = await addProduct(id)
            console.log(data);

            if(data?.status === "success"){
                toast.success("Added to cart successfully",{
                    duration:3000,
                    position:"top-center"
                })
            } else {
                toast.error("Can't add the product",{
                    duration:3000,
                    position:"top-center"
                })
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product to cart",{
                duration:3000,
                position:"top-center"
            })
        } finally {
            setIsLoading(false);
        }
    }

return (
                <Button  
                    onClick={()=>addToCart(id)}
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-shopping-cart"></i>
                            Add to Cart
                        </>
                    )}
                </Button>
  )
}

export default AddProductBtn