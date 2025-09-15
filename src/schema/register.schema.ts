import z from 'zod'

export const registerSchema  = z.object(
    {
    name: z.string().min(5 , "minimun Lenght is 5").max(20 , "maxmun Lenght is 20") ,
    email:z.email("Email is invalid"),
    password:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Password must have an upper and lowercase char,special char and Numbers "),
    rePassword:z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , "Password must have an upper and lowercase char,special char and Numbers "),
    phone:z.string().regex(/^01[0,1,2,5][0-9]{8}$/ , "invalid Number")
}).refine(function(object){
if (object.password === object.rePassword) {
    return true
}
return false
},{
    path : ["rePassword"],
    error : "repassword doesn't match"
}


)

export type regidterSchemaType = z.infer<typeof registerSchema>