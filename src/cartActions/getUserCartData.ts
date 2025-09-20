"use server"

import { getMyToken } from "@/utilities/token"

export async function getUserCartDataAction(){

    const token = await getMyToken()
    if(!token){
        throw Error("Login First")
    }

    
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`)

    // console.log(data);
    return data
}