import axios from "axios";



export async function getSpecificBrand(id:string){

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    return data
}