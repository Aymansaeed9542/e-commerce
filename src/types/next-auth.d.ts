import NextAuth from "next-auth"

declare module "next-auth" {


    interface User {
        user : {
            id : string,
            email : string,
            role : string
        },
        token : string
    }
  interface Session {
    user: User.user
  }
}