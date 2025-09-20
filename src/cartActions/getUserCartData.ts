"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserCartDataAction(){

    const token = await getMyToken()
    if(!token){
        throw new Error("Login First")
    }

    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {headers:{
        token : token as string
    }})
    const data = await res.json()

    // console.log(data);
    return data
}