"use server"
import { getMyToken } from "@/utilities/token";
import axios from "axios";


export async function deleteProductAction(id :string){

const token = await getMyToken()
if(!token){
    throw Error("please Login first")
}
const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers :{
        token :token as string
    }
})

return data
}