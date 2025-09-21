

import { getAllCategories } from '@/apis/allCategories'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Grid3X3 } from 'lucide-react'

interface Category {
  image: string;
  name: string;
  slug: string;
}

const CategoriesSlides = async () => {
    const data = await getAllCategories()
    console.log(data);
    
  return (
    <div className="space-y-8">
      {/* Categories Grid - 5 per row, 2 rows */}
      <div className="grid grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto">
        {data.data.slice(0, Math.min(data.data.length, 10)).map((category: Category, idx: number) => (
          <Link 
            key={idx} 
            href={`/categories/${category.slug}`}
            className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image 
                src={category.image} 
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Category Name */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-sm font-semibold text-white group-hover:text-white transition-colors duration-200 text-center">
                {category.name}
              </h3>
            </div>
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        ))}
      </div>
      
      {/* View All Categories CTA */}
      <div className="text-center pt-4">
        <Link 
          href="/categories"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-all duration-300 hover:scale-105 btn-animate"
        >
          <Grid3X3 className="h-5 w-5" />
          View All Categories
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export default CategoriesSlides