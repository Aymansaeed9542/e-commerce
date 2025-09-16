import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"

const authOptions : AuthOptions = {

    providers : [
        CredentialsProvider({
                name: 'Credentials',
                    credentials: {
      Email: { label: "Email", type: "email", placeholder: "Examble@gmail.com" },
      password: { label: "Password", type: "password" }
    },

     authorize: async function (credentials){
            const response = await fetch("" , {
                method: "POST",
                body: JSON.stringify({
                    email: credentials?.Email,
                    password: credentials?.password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        const {data} = await response.json()
        console.log(data);
        
            return null
    }




        })

    ]
}