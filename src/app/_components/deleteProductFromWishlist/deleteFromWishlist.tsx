"use client"

import { deleteProductFromWishlistAction } from '@/wishlistActions/deleteProductFromWishlist'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type DeleteFromWishlistProps = {
    id: string
    onDeleted?: () => void
    size?: 'sm' | 'default' | 'lg' | 'icon'
}

const DeleteFromWishlist = ({ id, onDeleted, size = 'sm' }: DeleteFromWishlistProps) => {
    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDeleteFromWishlist(){
        if (isDeleting) return
        setIsDeleting(true)
        try {
            const data = await deleteProductFromWishlistAction(id)
            if (data.status === 'success') {
                toast.success('Removed from wishlist', { position: 'top-center' })
                onDeleted?.()
            } else {
                toast.error('Failed to remove item')
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to remove item')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Button
            variant="destructive"
            size={size}
            onClick={handleDeleteFromWishlist}
            disabled={isDeleting}
            className={size === 'icon' ? 'h-8 w-8 p-0 rounded-full' : ''}
            aria-label="Remove from wishlist"
        >
            {isDeleting ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {size !== 'icon' && <span className="ml-2">Removing...</span>}
                </>
            ) : (
                <>
                    <Trash2 className="h-4 w-4" />
                    {size !== 'icon' && <span className="ml-2">Remove</span>}
                </>
            )}
        </Button>
    )
}

export default DeleteFromWishlist