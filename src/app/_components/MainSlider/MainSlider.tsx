"use client"

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
    <div className="flex flex-col md:flex-row mb-10 gap-4">
      {/* البانرات على الشمال */}
      <div className="flex flex-col md:w-1/3 w-full gap-4">
        <Image
          src={img4}
          alt=""
          className="object-cover w-full h-auto xl:h-[200px] rounded-lg"
        />
        <Image
          src={img5}
          alt=""
          className="object-cover w-full h-auto xl:h-[200px] rounded-lg"
        />
      </div>

      <div className="md:w-2/3 w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          className="w-full xl:h-[400px] h-auto  rounded-lg"
        >
          <SwiperSlide>
            <Image
              src={img1}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img2}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src={img3}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MainSlider;
