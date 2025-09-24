'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { regidterSchemaType, registerSchema } from '@/schema/register.schema'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Register = () => {

  const router = useRouter()
  const form = useForm<regidterSchemaType>({
    defaultValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
},
resolver : zodResolver(registerSchema)
  })

  async function handleRegister(values:regidterSchemaType){
    try {
      const {data}= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values)
      console.log(data);
  
  router.push("/login")
toast.success(data.message , {
  position: 'top-center',
  duration: 3000
})
    }
    
    catch (error) {
      console.log(error);
      

        toast.error("Account Already Exists", {
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
                  Create Account
                </CardTitle>
                <p className="text-muted-foreground text-xs">
                  Join us today and start your journey
                </p>
              </CardHeader>
              
              <CardContent className="px-4">
                <Form {...form}>
                  <form className="space-y-3" onSubmit={form.handleSubmit(handleRegister)}>
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-card-foreground block mb-1">Full Name</FormLabel>
                          <FormControl>
                            <input
                              type="text"
                              id="fullName"
                              className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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

                    {/* Confirm Password */}
                    <FormField
                      control={form.control}
                      name="rePassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-card-foreground block mb-1">Confirm Password</FormLabel>
                          <FormControl>
                            <input
                              type="password"
                              id="confirmPassword"
                              className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                              placeholder="Confirm your password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone Number */}
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-card-foreground block mb-1">Phone Number</FormLabel>
                          <FormControl>
                            <input
                              type="tel"
                              id="phoneNumber"
                              className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus-border-transparent transition-all duration-200 border-border"
                              placeholder="Enter your phone number"
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
                      Create Account
                    </Button>

                    {/* Login Link */}
                    <div className="text-center pt-1">
                      <p className="text-muted-foreground text-xs">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                          Sign in
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

export default Register
