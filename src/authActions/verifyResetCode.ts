"use server"

import axios from "axios"

export interface VerifyResetCodeResponse {
    status: string
}

export async function verifyResetCodeAction(resetCode: string): Promise<VerifyResetCodeResponse> {
    const { data } = await axios.post<VerifyResetCodeResponse>(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        { resetCode },
        { headers: { "Content-Type": "application/json" } }
    )
    return data
}


