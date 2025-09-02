"use client"

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import img4 from "./../../../assets/screens/slider/grocery-banner.png";
import img5 from "./../../../assets/screens/slider/grocery-banner-2.jpeg";



import img1 from "./../../../assets/screens/slider/slider-image-1.jpeg";
import img2 from "./../../../assets/screens/slider/slider-image-2.jpeg";
import img3 from "./../../../assets/screens/slider/slider-image-3.jpeg";

import Image from "next/image";
import { Autoplay } from "swiper/modules";

const MainSlider = () => {
  return (
    <div className="flex mb-10">
        <div className="flex flex-col w-1/3">
        <Image src={img4} alt="" className=" object-cover h-[200px]"></Image>
        <Image src={img5} alt="" className=" object-cover h-[200px]"></Image>
    </div>
    <div className="w-2/3">
            <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)
      }
    loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        
      }}
      speed={3000}
      modules={[Autoplay]}
    
    >
      <SwiperSlide>
    <Image src={img1} alt="" className=" w-full object-cover h-[400px]"></Image>
      </SwiperSlide>
      <SwiperSlide>
    <Image src={img2} alt="" className=" w-full object-cover h-[400px]"></Image>
      </SwiperSlide>
      <SwiperSlide>
    <Image src={img3} alt="" className=" w-full object-cover h-[400px]"></Image>
      </SwiperSlide>

    </Swiper>
    </div>
    </div>
  );
};

export default MainSlider;
