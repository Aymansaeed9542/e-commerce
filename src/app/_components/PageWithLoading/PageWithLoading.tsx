"use client"

import { useState, useEffect } from "react"
import LoadingCurtain from "../_components/LoadingCurtain/LoadingCurtain"

interface PageWithLoadingProps {
  children: React.ReactNode
}

export default function PageWithLoading({ children }: PageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 second delay to see the animation

    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingCurtain isLoading={isLoading}>
      {children}
    </LoadingCurtain>
  )
}
