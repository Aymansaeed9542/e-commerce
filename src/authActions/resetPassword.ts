"use server"

import axios from "axios"

export interface ResetPasswordResponse {
    token?: string
    user?: unknown
}

export async function resetPasswordAction(email: string, newPassword: string): Promise<ResetPasswordResponse> {
    const { data } = await axios.put<ResetPasswordResponse>(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        { email, newPassword }
    )
    return data
}


