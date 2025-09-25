import axios from "axios";

export async function getSpecificSubcategory(id:string){

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
    return data
}


