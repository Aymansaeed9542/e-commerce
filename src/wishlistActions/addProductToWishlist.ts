"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export async function addProductToWishlistAction(id: string) {
    try {
        const token = await getMyToken()
        if (!token) {
            throw new Error("Login First")
        }

        const response = await axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist", 
            { productId: id },
            {
                headers: {
                    token: token as string
                }
            }
        )

        return response.data
    } catch (error) {
        console.error("Error adding to wishlist:", error)
        throw error
    }
}
