"use client"

import Link from 'next/link';
import React from 'react'


const NotfoundPage = () => {
  return (
  <main className="min-h-screen flex items-center justify-center bg-gradient-to-b bg-gray-200 text-black p-6">
      <div className="max-w-3xl w-full backdrop-blur  p-8 text-center mb-50">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page not found</h2>
        <p className="text-gray-500 mb-6">
          The page you are trying to reach cannot be found.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="px-5 py-2 rounded-lg bg-green-400 text-slate-900 font-medium hover:brightness-95">
            Go to Home
          </Link>

          {/* history.back() needs client-side; we'll use a small client component for it */}
          <button
            onClick={() => typeof window !== "undefined" && history.back()}
            className="px-5 py-2 rounded-lg border border-slate-700 text-black hover:bg-slate-800 hover:text-white duration-300"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  )
}

export default NotfoundPage