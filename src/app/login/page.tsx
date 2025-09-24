'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { loginSchema, loginSchemaType } from '@/schema/login.schema'
import {signIn} from "next-auth/react"
import Link from 'next/link'

const Login = () => {

  const router = useRouter()
  const form = useForm<loginSchemaType>({
    defaultValues: {
    email:"",
    password:"",

},
resolver : zodResolver(loginSchema)
  })

  async function handleLogin(values:loginSchemaType){



//     try {
//       const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , values)
//       console.log(data);
  
//   router.push("/")
// toast.success(data.message , {
//   position: 'top-center',
//   duration: 3000
// })
//     }
    
//     catch (error) {
//       console.log(error);
      

//         toast.error("Account Already Exists", {
//     position : 'top-center',
//     duration : 3000
//   }) 
//     





    const res = await signIn("credentials", {
  email : values.email,
  password : values.password,
  redirect : false,
  callbackUrl : "/"
}
)
console.log(res);
if(res?.ok){
  toast.success("success" , {
  position: 'top-center',
  duration: 3000
})
router.push(res.url || "/")
  router.refresh() 
    }
    else{
            toast.error("Invalid email or password", {
    position : 'top-center',
    duration : 3000
})
    }


  }




  return (
    <div className="bg-background flex items-center justify-center p-4 mt-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[4fr_6fr] gap-4 items-center">
          {/* Left Side - Registration Form (40%) */}
          <div className="w-full max-w-3xl mx-auto lg:mx-0">
            <Card className="bg-card border-border shadow-lg p-4">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-lg font-bold text-card-foreground mb-1">
                  Login to your Account
                </CardTitle>
                <p className="text-muted-foreground text-xs">
                  Discover our new Products
                </p>
              </CardHeader>
              
              <CardContent className="px-4">
                <Form {...form}>
                  <form className="space-y-3" onSubmit={form.handleSubmit(handleLogin)}>

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-card-foreground block mb-1">Email</FormLabel>
                          <FormControl>
                            <input
                              type="email"
                              id="email"
                              className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-card-foreground block mb-1">Password</FormLabel>
                          <FormControl>
                            <input
                              type="password"
                              id="password"
                              className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                              placeholder="Create a password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />



                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-1.5 text-sm rounded transition-all duration-200"
                    >
                      Login
                    </Button>

                    {/* Register Link */}
                    <div className="text-center pt-1">
                      <p className="text-muted-foreground text-xs">
                        Already have an account?{' '}
                        <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Image (70%) */}
          <div className="w-full lg:block hidden">
            <div className="relative rounded-lg overflow-hidden ">
              <Image
                src="/register1-removebg-preview.png"
                alt="Registration"
                width={600}
                height={400}
                className="w-full h-auto object-contain rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
)
}

export default Login