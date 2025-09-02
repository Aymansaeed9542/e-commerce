import getSingleProduct from '@/apis/singleProduct'
import { Button } from '@/components/ui/button'
import React from 'react'

const ProductDetails = async ({params} :{params :{id: string}}) => {
const {id} = await params
const data = await getSingleProduct(id)
console.log(data);


return (
    <section className='my-10 md:w-[80%] md:px-0 px-5 w-full mx-auto flex items-center flex-col md:flex-row'>
      <div className='w-full md:w-1/3'>
      <img src={data.imageCover} alt="" className='w-100' />
      
      </div>
      <div className=' w-full md:w-2/3 mx-10 '>
      <h3 className='pb-3 text-2xl'>{ data.title}</h3>
      <p className='text-gray-500 text-sm'>
        {data.description}
      </p>

      <p className=' mt-5'>{data.category.name}</p>
      <div className='flex justify-between'>
        <p>{data.price}EGP</p>
        <p className=''><i className="fas fa-star text-yellow-400 mb-4"></i>{data.ratingsAverage}</p>
      </div>
                  <div className="  flex flex-wrap items-center gap-2 md:flex-row">
      <Button className='w-full bg-green-600'>Add to Cart</Button>
    </div>
      </div>
  
    </section>
  )
}

export default ProductDetails