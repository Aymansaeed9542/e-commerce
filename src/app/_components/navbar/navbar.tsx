"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../../assets/screens/freshcart-logo.svg";
import Link from "next/link";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
            <nav className="mx-auto lg:w-[80%] md:w-[90%] sm:w-full px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button aria-label="Menu" className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50" onClick={() => setOpen(!open)}>
                            <i className="fas fa-bars"></i>
                        </button>
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={logo} alt="Logo" className="h-7 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-6 text-sm text-gray-600">
                        <Link href="/products" className="hover:text-black">Products</Link>
                        <Link href="/categories" className="hover:text-black">Categories</Link>
                        <Link href="/brands" className="hover:text-black">Brands</Link>
                        <Link href="/cart" className="hover:text-black">Cart</Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <div className="relative">
                            <input className="h-9 w-56 rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Search products..." />
                            <i className="fas fa-search absolute right-3 top-2.5 text-gray-400 text-xs"></i>
                        </div>
                        <Link href="/cart" className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border hover:bg-gray-50">
                            <i className="fas fa-shopping-cart"></i>
                            <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-emerald-600 px-1.5 text-[10px] font-semibold text-white flex items-center justify-center">0</span>
                        </Link>
                        <div className="flex items-center gap-3 text-sm">
                            <Link href="/login" className="hover:underline">Login</Link>
                            <span className="text-gray-300">/</span>
                            <Link href="/register" className="hover:underline">Register</Link>
                        </div>
                    </div>
                </div>

                {open && (
                    <div className="lg:hidden pb-4">
                        <div className="grid gap-3">
                            <div className="relative">
                                <input className="h-10 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Search products..." />
                                <i className="fas fa-search absolute right-3 top-3.5 text-gray-400 text-sm"></i>
                            </div>
                            <div className="grid gap-2 text-gray-700">
                                <Link href="/products" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-50">Products</Link>
                                <Link href="/categories" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-50">Categories</Link>
                                <Link href="/brands" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-50">Brands</Link>
                                <Link href="/cart" onClick={() => setOpen(false)} className="px-2 py-2 rounded-md hover:bg-gray-50">Cart</Link>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/login" onClick={() => setOpen(false)} className="text-sm underline">Login</Link>
                                <Link href="/register" onClick={() => setOpen(false)} className="text-sm underline">Register</Link>
                                <Link href="/logout" onClick={() => setOpen(false)} className="text-sm text-gray-500">Logout</Link>
                            </div>
                            <div className="flex items-center gap-3 text-lg text-gray-600">
                                <i className="fab fa-instagram"></i>
                                <i className="fab fa-facebook"></i>
                                <i className="fab fa-tiktok"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-linkedin"></i>
                                <i className="fab fa-youtube"></i>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
