"use client"

import React, { useState } from 'react'
import Link from 'next/link'
// import Image from 'next/image'
import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  ShoppingBag,
  Shield,
  Truck,
  RotateCcw,
  Smartphone,
  Globe,
  ChevronDown
} from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setEmail('')
      // Show success toast here
    }, 1000)
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  FreshCart
                </span>
              </Link>
              <p className="text-gray-300 leading-relaxed mb-6">
                Your trusted partner for premium quality products. We deliver excellence with every order, 
                ensuring your satisfaction is our top priority.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm">support@freshcart.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">123 Commerce St, City, State 12345</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Products', href: '/products' },
                { name: 'Categories', href: '/categories' },
                { name: 'Brands', href: '/brands' },
                { name: 'Deals', href: '/deals' },
                { name: 'New Arrivals', href: '/new-arrivals' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Customer Support</h3>
            <ul className="space-y-3">
              {[
                { name: 'Help Center', href: '/help' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Returns', href: '/returns' },
                { name: 'Size Guide', href: '/size-guide' },
                { name: 'Track Order', href: '/track' }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Stay Connected</h3>
            
            {/* Newsletter */}
            <div className="mb-8">
              <p className="text-gray-300 text-sm mb-4">
                Subscribe to our newsletter for exclusive deals and updates.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-white px-6"
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Social Media */}
            <div>
              <p className="text-gray-300 text-sm mb-4">Follow us on social media</p>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#', color: 'hover:text-blue-300' },
                  { icon: Instagram, href: '#', color: 'hover:text-pink-400' },
                  { icon: Linkedin, href: '#', color: 'hover:text-blue-500' },
                  { icon: Youtube, href: '#', color: 'hover:text-red-500' }
                ].map((social) => (
                  <Link
                    key={social.icon.name}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-gray-700 ${social.color}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="border-t border-gray-700 mt-16 pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure checkout' },
              { icon: Phone, title: '24/7 Support', desc: 'Always here to help' }
            ].map((feature) => (
              <div key={feature.title} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">We Accept</h4>
              <div className="flex items-center gap-4">
                {[
                  { name: 'Visa', color: 'bg-blue-600' },
                  { name: 'Mastercard', color: 'bg-red-500' },
                  { name: 'PayPal', color: 'bg-blue-500' },
                  { name: 'Apple Pay', color: 'bg-gray-800' },
                  { name: 'Google Pay', color: 'bg-gray-700' }
                ].map((payment) => (
                  <div key={payment.name} className={`w-12 h-8 ${payment.color} rounded flex items-center justify-center text-white text-xs font-bold`}>
                    {payment.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile App Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-gray-300 text-sm">Download our mobile app</p>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                  <Smartphone className="h-4 w-4 mr-2" />
                  App Store
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                  <Smartphone className="h-4 w-4 mr-2" />
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 FreshCart. All rights reserved. Made with <Heart className="h-4 w-4 inline text-red-500" /> for our customers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
              <div className="flex items-center gap-2 text-gray-400">
                <Globe className="h-4 w-4" />
                <span>English</span>
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
