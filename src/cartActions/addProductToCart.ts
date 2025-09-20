"use server"

import { getMyToken } from "@/utilities/token"
import axios from "axios"

export async function addProductToCard(id : string) {

    const token = await getMyToken()
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart` ,{
    productId: id
},
{
    headers:{
    token : token as string
}
}
    )
    return data
}