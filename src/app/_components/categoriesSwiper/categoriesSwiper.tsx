"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


interface Category {
  image: string;
  name: string;
}

interface CategoriesSwiperProps {
  categories: Category[];
}

const CategoriesSwiper = ({ categories }: CategoriesSwiperProps) => {

    
  return (
    <div>
            <Swiper
      spaceBetween={0}
      slidesPerView={7}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)} >



                {categories.map((category , idx) => <SwiperSlide key={idx} className='px-2 sm:px-4 md:px-6 lg:px-8 xl:px-3' >
                <img src={category.image} alt="" className='w-full h-[15rem] bg-amber-500' />
                <p></p>
                </SwiperSlide>
        )}
</Swiper>
    </div>
  )
}

export default CategoriesSwiper