import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export async function getMyToken(){
    const x  = (await cookies()).get("next-auth.session-token")?.value
    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
        throw new Error("NEXTAUTH_SECRET is not defined");
    }
    const token = await  decode({
        token : x,
        secret : secret
    })

    console.log(token);
    if (!token) {
        throw new Error("Failed to decode token.");
    }
    return token.token;
}