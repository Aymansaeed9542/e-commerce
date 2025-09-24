"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


export async function getUserOrders(){

    const token = await getMyToken()
    if(!token){
        throw new Error("Login First")
    }
    const {id} : {id : string} = jwtDecode(token as string)

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)


    return data

}