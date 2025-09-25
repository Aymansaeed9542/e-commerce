import axios from "axios";

export async function getAllSubcategories(){

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`)

    return data
}


