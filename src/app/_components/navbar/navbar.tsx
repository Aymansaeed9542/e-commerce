"use client";
import React, { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import logo from "../../../assets/screens/freshcart-logo.svg";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { cartContext } from "@/context/cartContext";
import { Search, ShoppingCart, Menu, X, User, Heart } from "lucide-react";

type SearchProduct = {
    _id: string
    title: string
    imageCover: string
    price: number
    category?: { name: string }
    brand?: { name: string }
}

type SearchResult = {
    products: SearchProduct[]
    categories: { _id: string; name: string }[]
    brands: { _id: string; name: string; image?: string }[]
}

// API response helpers
type ProductApi = {
    _id: string
    title: string
    imageCover: string
    price: number
    category?: { name: string }
    brand?: { name: string }
}

type CategoryApi = { _id: string; name: string }
type BrandApi = { _id: string; name: string; image?: string }

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const {status} = useSession()
    const cartContextValue = useContext(cartContext)
    const numOfCartItems = cartContextValue?.numOfCartItems || 0
    const [query, setQuery] = useState("")
    const [isSearching, setIsSearching] = useState(false)
    const [results, setResults] = useState<SearchResult>({ products: [], categories: [], brands: [] })
    const [showResults, setShowResults] = useState(false)
    const searchAbortRef = useRef<AbortController | null>(null)

    useEffect(() => {
        if (!query.trim()) {
            setResults({ products: [], categories: [], brands: [] })
            setIsSearching(false)
            return
        }
        setIsSearching(true)
        setShowResults(true)

        const controller = new AbortController()
        if (searchAbortRef.current) searchAbortRef.current.abort()
        searchAbortRef.current = controller

        const timeout = setTimeout(async () => {
            try {
                const keyword = encodeURIComponent(query.trim())
                const [prodRes, catRes, brandRes] = await Promise.all([
                    fetch(`https://ecommerce.routemisr.com/api/v1/products?limit=5&keyword=${keyword}`, { signal: controller.signal }),
                    fetch(`https://ecommerce.routemisr.com/api/v1/categories`, { signal: controller.signal }),
                    fetch(`https://ecommerce.routemisr.com/api/v1/brands`, { signal: controller.signal }),
                ])
                const prodJson = await prodRes.json().catch(() => ({} as { data?: ProductApi[] })) as { data?: ProductApi[] }
                const catJson = await catRes.json().catch(() => ({} as { data?: CategoryApi[] })) as { data?: CategoryApi[] }
                const brandJson = await brandRes.json().catch(() => ({} as { data?: BrandApi[] })) as { data?: BrandApi[] }

                const products: SearchProduct[] = Array.isArray(prodJson?.data) ? prodJson.data.map((p: ProductApi) => ({
                    _id: p._id,
                    title: p.title,
                    imageCover: p.imageCover,
                    price: p.price,
                    category: p.category,
                    brand: p.brand,
                })) : []

                const qLower = query.trim().toLowerCase()
                const categoriesSource = Array.isArray(catJson?.data) ? catJson.data : []
                const brandsSource = Array.isArray(brandJson?.data) ? brandJson.data : []
                const categories = categoriesSource.filter((c: CategoryApi) => c?.name?.toLowerCase().includes(qLower)).slice(0, 5)
                const brands = brandsSource.filter((b: BrandApi) => b?.name?.toLowerCase().includes(qLower)).slice(0, 5)

                setResults({ products, categories, brands })
            } catch (e: unknown) {
                if (!(e instanceof DOMException && e.name === 'AbortError')) {
                    setResults({ products: [], categories: [], brands: [] })
                }
            } finally {
                setIsSearching(false)
            }
        }, 350)

        return () => {
            clearTimeout(timeout)
            controller.abort()
        }
    }, [query])
    
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <Image src={logo} alt="FreshCart Logo" className="h-8 w-auto" />
                        </Link>
                    </div>

                    {/* Mobile Controls - Right Side */}
                    <div className="lg:hidden flex items-center gap-2">
                        {/* Cart Icon for Mobile */}
                        <Link href="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                            <ShoppingCart className="h-5 w-5" />
                            {numOfCartItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground flex items-center justify-center animate-pulse">
                                    {numOfCartItems > 99 ? '99+' : numOfCartItems}
                                </span>
                            )}
                        </Link>
                        {/* Wishlist Icon for Mobile */}
                        <Link href="/wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                            <Heart className="h-5 w-5" />
                        </Link>
                        
                        {/* Theme Toggle for Mobile */}
                        <ThemeToggle />
                        
                        {/* Mobile Menu Button (authenticated only) */}
                        {status === "authenticated" && (
                            <button 
                                aria-label="Menu" 
                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors" 
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        )}
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
                                <Link href="/allorders" className="block px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                                    All Orders
                                </Link>
                            </div>
                            
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => query && setShowResults(true)}
                                    onBlur={() => setTimeout(() => setShowResults(false), 150)}
                                    className="h-10 w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                                    placeholder="Search products, categories, brands" 
                                />
                                {showResults && (results.products.length || results.categories.length || results.brands.length || isSearching) ? (
                                    <div className="absolute z-50 mt-2 w-[28rem] max-w-[90vw] rounded-lg border bg-popover p-2 text-popover-foreground shadow-lg">
                                        {isSearching && (
                                            <div className="px-3 py-2 text-sm text-muted-foreground">Searching…</div>
                                        )}
                                        {!isSearching && (
                                            <div className="space-y-2">
                                                {results.products.length > 0 && (
                                                    <div>
                                                        <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">Products</div>
                                                        <ul className="max-h-60 overflow-auto">
                                                            {results.products.map((p) => (
                                                                <li key={p._id}>
                                                                    <Link href={`/productDetails/${p._id}`} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                        <img src={p.imageCover} alt={p.title} className="h-8 w-8 rounded object-cover" />
                                                                        <div className="min-w-0">
                                                                            <p className="truncate text-sm font-medium">{p.title}</p>
                                                                            <p className="truncate text-xs text-muted-foreground">{p.category?.name} • {p.brand?.name}</p>
                                                                        </div>
                                                                        <span className="ml-auto text-xs font-medium">${p.price}</span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {results.categories.length > 0 && (
                                                    <div>
                                                        <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">Categories</div>
                                                        <ul className="max-h-60 overflow-auto">
                                                            {results.categories.map((c) => (
                                                                <li key={c._id}>
                                                                    <Link href={`/categories`} className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                                                        {c.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {results.brands.length > 0 && (
                                                    <div>
                                                        <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">Brands</div>
                                                        <ul className="max-h-60 overflow-auto">
                                                            {results.brands.map((b) => (
                                                                <li key={b._id}>
                                                                    <Link href={`/specificBrand/${b._id}`} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                        {b.image ? <img src={b.image} alt={b.name} className="h-6 w-6 rounded object-cover" /> : <div className="h-6 w-6 rounded bg-muted" />}
                                                                        <span className="text-sm">{b.name}</span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {!results.products.length && !results.categories.length && !results.brands.length && (
                                                    <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
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
                            {/* Wishlist Icon */}
                            <Link href="/wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
                                <Heart className="h-5 w-5" />
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
                        </div>
                    )}
                </div>

                {/* Mobile Menu (authenticated only) */}
                {status === "authenticated" && open && (
                    <div className="lg:hidden border-t bg-background/95 backdrop-blur">
                        <div className="px-4 py-6 space-y-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <input 
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onFocus={() => query && setShowResults(true)}
                                    onBlur={() => setTimeout(() => setShowResults(false), 150)}
                                    className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent" 
                                    placeholder="Search products, categories, brands" 
                                />
                                {showResults && (results.products.length || results.categories.length || results.brands.length || isSearching) ? (
                                    <div className="absolute z-50 mt-2 w-full rounded-lg border bg-popover p-2 text-popover-foreground shadow-lg">
                                        {isSearching && (
                                            <div className="px-3 py-2 text-sm text-muted-foreground">Searching…</div>
                                        )}
                                        {!isSearching && (
                                            <div className="space-y-2">
                                                {results.products.length > 0 && (
                                                    <div>
                                                        <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">Products</div>
                                                        <ul className="max-h-60 overflow-auto">
                                                            {results.products.map((p) => (
                                                                <li key={p._id}>
                                                                    <Link href={`/productDetails/${p._id}`} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                        <img src={p.imageCover} alt={p.title} className="h-8 w-8 rounded object-cover" />
                                                                        <div className="min-w-0">
                                                                            <p className="truncate text-sm font-medium">{p.title}</p>
                                                                            <p className="truncate text-xs text-muted-foreground">{p.category?.name} • {p.brand?.name}</p>
                                                                        </div>
                                                                        <span className="ml-auto text-xs font-medium">${p.price}</span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {results.categories.length > 0 && (
                                                    <div>
                                                        <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">Categories</div>
                                                        <ul className="max-h-60 overflow-auto">
                                                            {results.categories.map((c) => (
                                                                <li key={c._id}>
                                                                    <Link href={`/categories`} className="block rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                                                        {c.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {results.brands.length > 0 && (
                                                    <div>
                                                        <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">Brands</div>
                                                        <ul className="max-h-60 overflow-auto">
                                                            {results.brands.map((b) => (
                                                                <li key={b._id}>
                                                                    <Link href={`/specificBrand/${b._id}`} className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground">
                                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                                        {b.image ? <img src={b.image} alt={b.name} className="h-6 w-6 rounded object-cover" /> : <div className="h-6 w-6 rounded bg-muted" />}
                                                                        <span className="text-sm">{b.name}</span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                                {!results.products.length && !results.categories.length && !results.brands.length && (
                                                    <div className="px-3 py-2 text-sm text-muted-foreground">No results</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
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
                                    href="/allorders" 
                                    onClick={() => setOpen(false)} 
                                    className="block px-3 py-2 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                >
                                    All Orders
                                </Link>
                            
                            </div>
                            
                            {/* Auth Links */}
                            <div className="flex items-center gap-4 pt-4 border-t">
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
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;