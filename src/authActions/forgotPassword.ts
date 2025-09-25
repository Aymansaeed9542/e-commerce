"use server"

import axios from "axios"

export interface ForgotPasswordResponse {
    status: string
    message?: string
}

export async function forgotPasswordAction(email: string): Promise<ForgotPasswordResponse> {
    const { data } = await axios.post<ForgotPasswordResponse>(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email },
        { headers: { "Content-Type": "application/json" } }
    )
    return data
}


