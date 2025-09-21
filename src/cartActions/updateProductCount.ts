    "use server"

import { Cart } from "@/types/cart.type";
import { getMyToken } from "@/utilities/token";
import axios from "axios";



    export async function updateProductCountAction(id: string, count: number){
        const token = await getMyToken()
        const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,    {
    count: count
},{
            headers:{
                token : token as string
            }
        },
)

console.log(data);
return data

    }
