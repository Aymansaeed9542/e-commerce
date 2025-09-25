"use server"

import axios from "axios"
import { getMyToken } from "@/utilities/token"

export interface ChangeMyPasswordResponse {
    status: string
}

export async function changeMyPasswordAction(body: { currentPassword: string; password: string; rePassword: string }): Promise<ChangeMyPasswordResponse> {
    const token = await getMyToken()
    if (!token) {
        throw new Error("Login First")
    }

    const { data } = await axios.put<ChangeMyPasswordResponse>(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        body,
        {
            headers: {
                token: token as string,
            },
        }
    )

    return data
}


