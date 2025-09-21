"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"


export async function clearAllProductsAction(){
    const token = await getMyToken()
    const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers:{
            token : token as string
        }
    })

    return data
}