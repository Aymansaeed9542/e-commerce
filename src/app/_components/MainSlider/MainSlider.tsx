"use client"

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import BlackFridayBanner from "./../../../assets/screens/slider/Black-Friday_web_banner_17.jpg";
import img2 from "./../../../assets/screens/slider/Black-Friday-Web-Banner-06.jpg";
import img3 from "./../../../assets/screens/slider/Black-Friday-Facebook-Cover-Banner-20.jpg";
import img4 from "./../../../assets/screens/slider/18899191.jpg";

type Slide = {
  id: number;
  src: import("next/image").StaticImageData;
  alt: string;
  headline?: string;
  subcopy?: string;
  cta?: { label: string; href: string };
};

const MainSlider = () => {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: 1,
        src: BlackFridayBanner,
        alt: "Black Friday Banner",
        headline: "Black Friday Sale",
        subcopy: "Up to 70% off on all products! Limited time offer.",
        cta: { label: "Shop Now", href: "/products" },
      },
      {
        id: 2,
        src: img2,
        alt: "Black Friday Web Banner",
        headline: "Amazing Deals",
        subcopy: "Discover incredible discounts on your favorite brands.",
        cta: { label: "Explore", href: "/products" },
      },
      {
        id: 3,
        src: img3,
        alt: "Black Friday Facebook Cover Banner",
        headline: "Premium Quality",
        subcopy: "Shop the finest products with guaranteed satisfaction.",
        cta: { label: "Discover", href: "/categories" },
      },
      {
        id: 4,
        src: img4,
        alt: "Product Banner",
        headline: "Shop Top Categories",
        subcopy: "Find the best products in every category.",
        cta: { label: "Shop Now", href: "/categories" },
      },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, paused, next]);

  return (
    <div
      className="relative w-full overflow-hidden shadow-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === active ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            aria-hidden={index !== active}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
      </div>


      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === active 
                ? "bg-white scale-125 shadow-lg" 
                : "bg-white/50 hover:bg-white/80 hover:scale-110"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
