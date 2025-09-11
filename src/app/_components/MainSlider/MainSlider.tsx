"use client"

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import BlackFridayBanner from "./../../../assets/screens/slider/Black-Friday_web_banner_17.jpg";
import img2 from "./../../../assets/screens/slider/Black-Friday-Web-Banner-06.jpg";
import img3 from "./../../../assets/screens/slider/Black-Friday-Facebook-Cover-Banner-20.jpg";
import img4 from "./../../../assets/screens/slider/18899191.jpg";

type Slide = {
  id: number;
  src: import("next/image").StaticImageData;
  alt: string;
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

  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    timeoutRef.current && clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, 4500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, paused, slides.length]);

  return (
    <div
      className="relative mb-0 w-full overflow-hidden shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[260px] sm:h-[320px] md:h-[420px] lg:h-[520px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === active ? "opacity-100" : "opacity-0"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="max-w-4xl text-center text-white">
                {slide.cta && (
                  <a
                    href={slide.cta.href}
                    className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg transition hover:opacity-90 hover:scale-105"
                  >
                    {slide.cta.label}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white"
        >
          ‹
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-900 shadow hover:bg-white"
        >
          ›
        </button>
      </div>

      <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              i === active ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;
