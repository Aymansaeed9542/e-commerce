
    export default async function getAllProducts(){

            const response = await fetch(`${process.env.NEXT_URL}/api/users`)
    const {data}= await response.json()
        return data
    }