import { getAllBrands } from '@/apis/getAllBrands'
import React from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { BrandsResponse, BrandEntity } from '@/types/brands.type'
import Link from 'next/link'

const Brands = async () =>  {

  const data: BrandsResponse = await getAllBrands()
  const brands: BrandEntity[] = data?.data ?? []

  console.log(data);
  
  
  if (!brands.length) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <p className="text-muted-foreground">No brands available.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Brands</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {brands.map((brand) => (

          <Card key={brand._id} className="group overflow-hidden p-0">
                      <Link href={`specificBrand/${brand._id}`}>
                                  <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center p-3">
                  <span className="rounded-md bg-background/90 px-2 py-1 text-center text-xs font-medium text-foreground shadow-sm backdrop-blur group-hover:bg-background">{brand.name}</span>
                </div>
              </div>
            </CardContent>
          </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Brands