
    export default async function getAllProducts(){

            const response = await fetch(`${process.env.NEXTAUTH_URL}/api/users`,{
    cache: "no-store"}
)

    const {data}= await response.json()
        return data
    }