import { getSpecificBrand } from '@/apis/getSpecificBrand'
import React from 'react'
import Image from 'next/image'
import { SpecificBrandResponse } from '@/types/brands.type'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const SpecificBrand = async({ params }: { params: { id: string } }) => {

   const { id } = await params

  
  const data: SpecificBrandResponse = await getSpecificBrand(id)

  console.log(data);
  
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Brand details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="relative h-28 w-28 overflow-hidden rounded-lg border">
              <Image src={data.data.image} alt={data.data.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-xl font-semibold">{data.data.name}</p>
              <p className="text-muted-foreground">Slug: {data.data.slug}</p>
              <p className="text-muted-foreground">ID: {data.data._id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SpecificBrand