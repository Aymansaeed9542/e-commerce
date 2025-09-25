"use server"

import { getMyToken } from "@/utilities/token";
import axios from "axios";

export interface DeleteWishlistResponse {
    status: string
}

export async function deleteProductFromWishlistAction(id: string): Promise<DeleteWishlistResponse> {
        const token = await getMyToken()
        if (!token) {
            throw new Error("Login First")
        }

        const { data } = await axios.delete<DeleteWishlistResponse>(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers: {
                    token: token as string
                }
            }
        )
        return data
}
