"use client"

import { useState, useEffect } from "react"
import LoadingCurtain from "./_components/LoadingCurtain/LoadingCurtain"

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Auto-open doors after a short delay to show the animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 1 second delay to see the loading state

    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingCurtain isLoading={isLoading}>
      {/* Intentionally render nothing under the curtain so no text remains after opening */}
      <div />
    </LoadingCurtain>
  )
}
