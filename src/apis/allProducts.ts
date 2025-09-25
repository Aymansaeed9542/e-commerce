
import axios from "axios";

export default async function getAllProducts(){
    const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
    return data.data
}