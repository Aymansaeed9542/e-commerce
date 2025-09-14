'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Register = () => {
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
                <form className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="text-xs font-medium text-card-foreground block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="text-xs font-medium text-card-foreground block mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="text-xs font-medium text-card-foreground block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                      placeholder="Create a password"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="text-xs font-medium text-card-foreground block mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                      placeholder="Confirm your password"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="text-xs font-medium text-card-foreground block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                      placeholder="Enter your phone number"
                    />
                  </div>

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
                      <a href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                        Sign in
                      </a>
                    </p>
                  </div>
                </form>
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
