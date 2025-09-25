import React from 'react'
import { getSpecificSubcategory } from '@/apis/getSpecificSubcategory'

const SubcategoryPage = async ({ params }: { params: { id: string } }) => {
  const data = await getSpecificSubcategory(params.id)
  const sub = data?.data

  if (!sub) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-xl font-semibold">Subcategory not found</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">{sub.name}</h1>
      <p className="text-muted-foreground">{sub.slug}</p>
      <div className="mt-6 text-sm text-muted-foreground">ID: {sub._id}</div>
    </div>
  )
}

export default SubcategoryPage


