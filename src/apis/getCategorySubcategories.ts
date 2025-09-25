import axios from "axios";

export async function getCategorySubcategories(categoryId:string){

    const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
    return data
}


