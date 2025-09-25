"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export async function getUserOrders(){

    const token = await getMyToken()
    if (!token || typeof token !== 'string') {
        throw new Error('Invalid token specified: must be a string')
    }

    const decoded = jwtDecode<{ id?: string }>(token)
    const id = decoded?.id
    if (!id) {
        throw new Error('Invalid token payload: missing user id')
    }

    const {data} = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
        { headers: { token } }
    )


    return data

}