import React from 'react'
import { getCategorySubcategories } from '@/apis/getCategorySubcategories'
import Link from 'next/link'

const CategorySubcategoriesPage = async ({ params }: { params: { id: string } }) => {
  const data = await getCategorySubcategories(params.id)
  type Sub = { _id: string; name: string; slug: string }
  const subs: Sub[] = Array.isArray(data?.data) ? data.data as Sub[] : []

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Subcategories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subs.map((s: Sub) => (
          <Link key={s._id} href={`/subcategories/${s._id}`} className="block rounded-lg border p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-muted-foreground">{s.slug}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategorySubcategoriesPage


