import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("__Secure-next-auth.session-token")?.value;
        
        if (!sessionToken) {
            return null;
        }

        const secret = process.env.NEXTAUTH_SECRET;
        if (!secret) {
            throw new Error("NEXTAUTH_SECRET is not defined");
        }

        const token = await decode({
            token: sessionToken,
            secret: secret
        });

        if (!token) {
            return null;
        }

        return token.token;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}