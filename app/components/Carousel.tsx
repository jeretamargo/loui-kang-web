"use client";

import { useState } from "react";
import Image from "next/image";

const photos = [
  { src: "/images/slide1.webp", alt: "Loui Kang bajo un puente, remera negra" },
  { src: "/images/slide2.webp", alt: "Loui Kang frente a una torre de alta tensión" },
  { src: "/images/slide3.webp", alt: "Loui Kang de noche, con capucha" },
  { src: "/images/slide4.webp", alt: "Loui Kang grabando en el estudio" },
];

export default function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedPhoto = photos[selectedIndex];

  return (
    <div role="region" aria-label="Fotografías de Loui Kang">
      <div className="relative aspect-4/5 overflow-hidden rounded-md bg-surface" aria-live="polite">
        <Image
          src={selectedPhoto.src}
          alt={selectedPhoto.alt}
          fill
          sizes="(max-width: 959px) 100vw, (max-width: 1279px) 45vw, 520px"
          className="object-cover"
        />
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2.5">
        {photos.map(({ src }, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Ver foto ${index + 1}`}
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
            className={`cursor-pointer rounded-[5px] border p-0.5 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream motion-reduce:transition-none ${selectedIndex === index ? "border-accent-light opacity-100" : "border-transparent opacity-55"}`}
          >
            <span className="relative block aspect-square overflow-hidden rounded-[3px]">
              <Image src={src} alt="" fill sizes="(max-width: 959px) 25vw, 130px" className="object-cover" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
