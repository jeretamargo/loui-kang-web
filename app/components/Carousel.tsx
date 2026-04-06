/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import Autoplay from "embla-carousel-autoplay";

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div>
      <div className="embla relative ">
        <button
          className=" cursor-pointer embla__prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/20 transition hover:scale-105"
          onClick={scrollPrev}
        >
          <ArrowLeft></ArrowLeft>
        </button>
        <button
          className=" cursor-pointer embla__next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md rounded-full p-2 hover:bg-white/20 transition hover:scale-105"
          onClick={scrollNext}
        >
          <ArrowRight></ArrowRight>
        </button>
        <div className="embla__viewport relative" ref={emblaRef}>
          <div className="embla__container w-100 h-100 md:w-150 md:h-150 ">
            <div className="embla__slide  ">
              <img
                src="/images/slide1.png"
                className="w-full h-full object-cover"
                alt="loui kang"
                loading="lazy"
                decoding="async"
              ></img>
            </div>
            <div className="embla__slide w-full ">
              <img
                src="/images/slide2.png"
                className="w-full h-full object-cover"
                alt="loui kang"
                loading="lazy"
                decoding="async"
              ></img>
            </div>
            <div className="embla__slide w-full ">
              <img
                src="/images/slide3.png"
                className="w-full h-full object-cover"
                alt="loui kang"
                loading="lazy"
                decoding="async"
              ></img>
            </div>
            <div className="embla__slide w-full">
              <img
                src="/images/slide4.png"
                className="w-full h-full object-cover"
                alt="loui kang"
                loading="lazy"
                decoding="async"
              ></img>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
