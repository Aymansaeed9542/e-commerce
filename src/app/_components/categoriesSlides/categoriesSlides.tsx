

import { getAllCategories } from '@/apis/allCategories'
import React from 'react'
import CategoriesSwiper from '../categoriesSwiper/categoriesSwiper';

const CategoriesSlides = async () => {
    const data = await getAllCategories()
    console.log(data);
    
    
  return (
    <div className='my-5'>
      <CategoriesSwiper categories = {data.data} />
    </div>
  )
}

export default CategoriesSlides