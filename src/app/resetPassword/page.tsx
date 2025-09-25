'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import { forgotPasswordAction, type ForgotPasswordResponse } from '@/authActions/forgotPassword'
import { verifyResetCodeAction, type VerifyResetCodeResponse } from '@/authActions/verifyResetCode'
import { resetPasswordAction } from '@/authActions/resetPassword'
import { useRouter } from 'next/navigation'

type Step = 1 | 2 | 3

const ResetPasswordPage = () => {
  const [step, setStep] = useState<Step>(1)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const formEmail = useForm<{ email: string }>({ defaultValues: { email: '' } })
  const formCode = useForm<{ resetCode: string }>({ defaultValues: { resetCode: '' } })
  const formReset = useForm<{ newPassword: string }>({ defaultValues: { newPassword: '' } })

  async function onSubmitEmail(values: { email: string }) {
    try {
      const res: ForgotPasswordResponse = await forgotPasswordAction(values.email)
      console.log('Forgot password response:', res)

      const normalizedStatus = String(res.status ?? '').toLowerCase()
      const hasMessage = Boolean(res.message)
      if (normalizedStatus === 'success' || hasMessage || res.status === undefined) {
        setEmail(values.email)
        toast.success('Reset code sent to email', { position: 'top-center' })
        setStep(2)
      } else {
        const msg = res.message || 'Failed to send reset code'
        toast.error(msg)
      }
    } catch (error: unknown) {
      console.log('Forgot password error:', error)
      const errorMessage = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : 'Failed to send reset code'
      toast.error(errorMessage)
    }
  }

  async function onSubmitCode(values: { resetCode: string }) {
    const code = (values.resetCode || '').toString().trim()
    if (code.length === 0) {
      toast.error('Please enter the reset code')
      return
    }
    try {
      const res: VerifyResetCodeResponse = await verifyResetCodeAction(code)
      console.log('Verify response:', res)
      const normalizedStatus = String(res.status ?? '').toLowerCase()
      if (normalizedStatus === 'success') {
        toast.success('Code verified', { position: 'top-center' })
        setStep(3)
      } else {
        toast.error('Invalid or expired code')
      }
    } catch (error: unknown) {
      console.log('Verify code error:', error)
      const status = isAxiosError(error) ? error.response?.status : undefined
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : 'Invalid or expired code'
      if (status === 500) {
        toast.error('Server error while verifying code. Please request a new code and try again.')
      } else {
        toast.error(message)
      }
    }
  }

  async function onSubmitReset(values: { newPassword: string }) {
    try {
      await resetPasswordAction(email, values.newPassword)
      toast.success('Password updated. Please login.', { position: 'top-center' })
      router.push('/login')
    } catch (error: unknown) {
      console.log('Failed to reset password', error)
      const message = isAxiosError(error)
        ? error.response?.data?.message || error.message
        : error instanceof Error
          ? error.message
          : 'Failed to reset password'
      toast.error(message)
    }
  }

  return (
    <div className="bg-background flex items-center justify-center p-4 mt-8">
      <div className="w-full max-w-md mx-auto">
        <Card className="bg-card border-border shadow-lg p-4">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg font-bold text-card-foreground mb-1">
              {step === 1 && 'Forgot Password'}
              {step === 2 && 'Verify Reset Code'}
              {step === 3 && 'Set New Password'}
            </CardTitle>
            <p className="text-muted-foreground text-xs">
              {step === 1 && 'Enter your email to receive a reset code.'}
              {step === 2 && 'Enter the 6-digit code sent to your email.'}
              {step === 3 && 'Enter your new password.'}
            </p>
          </CardHeader>

          <CardContent className="px-4">
            {step === 1 && (
              <Form {...formEmail}>
                <form className="space-y-3" onSubmit={formEmail.handleSubmit(onSubmitEmail)}>
                  <FormField
                    control={formEmail.control}
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
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-1.5 text-sm rounded transition-all duration-200">
                    Send Code
                  </Button>
                </form>
              </Form>
            )}

            {step === 2 && (
              <Form {...formCode}>
                <form className="space-y-3" onSubmit={formCode.handleSubmit(onSubmitCode)}>
                  <FormField
                    control={formCode.control}
                    name="resetCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-card-foreground block mb-1">Reset Code</FormLabel>
                        <FormControl>
                          <input
                            type="text"
                            id="resetCode"
                            className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border tracking-widest"
                            placeholder="123456"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="w-1/3" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-1.5 text-sm rounded transition-all duration-200">
                      Verify Code
                    </Button>
                  </div>
                </form>
              </Form>
            )}

            {step === 3 && (
              <Form {...formReset}>
                <form className="space-y-3" onSubmit={formReset.handleSubmit(onSubmitReset)}>
                  <FormField
                    control={formReset.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-medium text-card-foreground block mb-1">New Password</FormLabel>
                        <FormControl>
                          <input
                            type="password"
                            id="newPassword"
                            className="w-full px-4 py-2 bg-input border rounded-md text-sm text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 border-border"
                            placeholder="Enter new password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="w-1/3" onClick={() => setStep(2)}>Back</Button>
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-1.5 text-sm rounded transition-all duration-200">
                      Reset Password
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ResetPasswordPage


