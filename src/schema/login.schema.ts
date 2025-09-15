import z from "zod"


export const loginSchema = z.object(
    {
                email:z.email("Email is invalid"),
                password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Password must have an upper and lowercase char,special char and Numbers "),
    }
)


export type loginSchemaType = z.infer<typeof loginSchema >