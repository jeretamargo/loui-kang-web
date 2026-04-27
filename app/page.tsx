"use client";
import { useEffect, useRef, useState } from "react";
import BurguerMenu from "./components/BurguerMenu";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Bio from "./components/Bio";
import Music from "./components/Music";
import Social from "./components/Social";
import Footer from "./components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar
        open={isOpen}
        setOpen={setIsOpen}
        isHeroVisible={isHeroVisible}
      ></Navbar>
      <Hero heroRef={heroRef}></Hero>
      <Bio></Bio>
      <Music></Music>
      <Social></Social>
      <Footer></Footer>
      <BurguerMenu open={isOpen} setOpen={setIsOpen}></BurguerMenu>
    </div>
  );
}
