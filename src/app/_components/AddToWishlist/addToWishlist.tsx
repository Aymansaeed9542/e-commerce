"use client"

import { addProductToWishlistAction } from '@/wishlistActions/addProductToWishlist'
import { Heart } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

export const AddToWishlist = ({ id }: {id: string | number}) => {
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    async function handleAddToWishList(productId: string){
        if (isLoading) return // Prevent multiple calls
        
        setIsLoading(true)
        try {
            const data = await addProductToWishlistAction(productId)
            setIsWishlisted(!isWishlisted)
            toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
                position:"top-center"
            })
        } catch (error) {
            console.log(error);
            toast.error("Failed to update wishlist")
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <button 
            aria-label="Add to wishlist"
            onClick={() => handleAddToWishList(String(id))}
            disabled={isLoading}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-background hover:bg-accent hover:text-accent-foreground'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
    )
}

export default AddToWishlist