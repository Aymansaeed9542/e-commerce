"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-slate-100 text-slate-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Get the FreshCart app</h3>
            <p className="text-slate-600 text-sm">
              We will send you a link; open it on your phone to download the app.
            </p>
          </div>

          <form
            className="flex w-full max-w-xl items-stretch overflow-hidden rounded-md bg-white text-slate-900"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email..."
              className="w-full flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400"
              aria-label="Email"
            />
            <button
              type="submit"
              className="bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-700"
            >
              Share App Link
            </button>
          </form>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-4 text-sm md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="font-medium">Payment Partners</span>
            <span className="text-black/80">Visa</span>
            <span className="text-black/80">Mastercard</span>
            <span className="text-black/80">PayPal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-medium">Get deliveries with FreshCart</span>
            <span className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">App Store</span>
            <span className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white">Google Play</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


