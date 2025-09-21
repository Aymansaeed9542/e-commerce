"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import logo from "../../../assets/screens/freshcart-logo.svg";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {data : session , status} = useSession()
    const cartContextValue = useContext(cartContext)
    const numOfCartItems = cartContextValue?.numOfCartItems || 0
    
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <button 
                            aria-label="Menu" 
                            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" 
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Image src={logo} alt="FreshCart Logo" className="h-8 w-auto" />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {status === "authenticated" && (
                        <div className="hidden lg:flex items-center gap-8">
                            <div className="flex items-center gap-6 text-sm font-medium">
                                <Link href="/products" className="text-foreground hover:text-primary transition-colors">
                                    Products
                                </Link>
                                <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
                                    Categories
                                </Link>
                                <Link href="/brands" className="text-foreground hover:text-primary transition-colors">
                                    Brands
                                </Link>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input 
                                    className="h-10 w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                                    placeholder="Search products..." 
                                />
                            </div>
                            
                            {/* Cart Icon */}
                            <Link href="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                                <ShoppingCart className="h-5 w-5" />
                                {numOfCartItems > 0 && (
                                    <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground flex items-center justify-center animate-pulse">
                                        {numOfCartItems > 99 ? '99+' : numOfCartItems}
                                    </span>
                                )}
                            </Link>
                            
                            {/* Theme Toggle */}
                            <ThemeToggle />
                            
                            {/* User Menu */}
                            <div className="flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                    <User className="h-4 w-4" />
                                </div>
                                <Button 
                                    onClick={() => signOut({ callbackUrl: "/login" })} 
                                    variant="outline" 
                                    size="sm"
                                    className="btn-animate"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {status === "loading" && (
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                            <span className="text-sm text-muted-foreground">Loading...</span>
                        </div>
                    )}

                    {/* Unauthenticated State */}
                    {status === "unauthenticated" && (
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <Link href="/login" className="text-foreground hover:text-primary transition-colors">
                                    Login
                                </Link>
                                <span className="text-muted-foreground">/</span>
                                <Link href="/register" className="text-foreground hover:text-primary transition-colors">
                                    Register
                                </Link>
                            </div>
                            <ThemeToggle />
                        </div>
                    )}
                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="lg:hidden border-t bg-background/95 backdrop-blur">
                        <div className="px-4 py-6 space-y-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input 
                                    className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                                    placeholder="Search products..." 
                                />
                            </div>
                            
                            {/* Navigation Links */}
                            <div className="space-y-3">
                                <Link 
                                    href="/products" 
                                    onClick={() => setOpen(false)} 
                                    className="block px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    Products
                                </Link>
                                <Link 
                                    href="/categories" 
                                    onClick={() => setOpen(false)} 
                                    className="block px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    Categories
                                </Link>
                                <Link 
                                    href="/brands" 
                                    onClick={() => setOpen(false)} 
                                    className="block px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    Brands
                                </Link>
                                <Link 
                                    href="/cart" 
                                    onClick={() => setOpen(false)} 
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    <ShoppingCart className="h-4 w-4" />
                                    Cart
                                    {numOfCartItems > 0 && (
                                        <span className="h-5 min-w-[20px] rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground flex items-center justify-center">
                                            {numOfCartItems > 99 ? '99+' : numOfCartItems}
                                        </span>
                                    )}
                                </Link>
                            </div>
                            
                            {/* Auth Links */}
                            <div className="flex items-center gap-4 pt-4 border-t">
                                <Link 
                                    href="/login" 
                                    onClick={() => setOpen(false)} 
                                    className="text-sm text-foreground hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    onClick={() => setOpen(false)} 
                                    className="text-sm text-foreground hover:text-primary transition-colors"
                                >
                                    Register
                                </Link>
                                <ThemeToggle />
                                {status === "authenticated" && (
                                    <Button 
                                        onClick={() => {
                                            signOut({ callbackUrl: "/login" });
                                            setOpen(false);
                                        }} 
                                        variant="outline" 
                                        size="sm"
                                        className="btn-animate"
                                    >
                                        Logout
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;