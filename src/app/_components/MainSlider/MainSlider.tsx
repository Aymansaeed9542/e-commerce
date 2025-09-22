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
        cta: { label: "Shop Now", href: "/products" },
      },
      {
        id: 2,
        src: img2,
        alt: "Black Friday Web Banner",
        cta: { label: "Explore", href: "/products" },
      },
      {
        id: 3,
        src: img3,
        alt: "Black Friday Facebook Cover Banner",
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
    timeoutRef.current = setTimeout(next, 4500);
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
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-5xl text-center text-white">
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    {slide.headline || "Welcome to FreshCart"}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                    {slide.subcopy || "Discover amazing products at unbeatable prices"}
                  </p>
                  {slide.cta && (
                    <div className="pt-4">
                      <a
                        href={slide.cta.href}
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-2xl transition-all duration-300 hover:shadow-primary/25 hover:scale-105 btn-animate"
                      >
                        {slide.cta.label}
                        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 btn-animate"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-gray-900 shadow-lg transition-all duration-300 hover:bg-white hover:scale-110 btn-animate"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
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
