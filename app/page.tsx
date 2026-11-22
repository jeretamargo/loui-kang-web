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

    const hero = heroRef.current;
    if (hero) {
      observer.observe(hero);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <header>
        <Navbar
          open={isOpen}
          setOpen={setIsOpen}
          isHeroVisible={isHeroVisible}
        ></Navbar>
      </header>
      <main>
        <Hero heroRef={heroRef}></Hero>
        <Bio></Bio>
        <Music></Music>
        <Social></Social>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
      <BurguerMenu open={isOpen} setOpen={setIsOpen}></BurguerMenu>
    </div>
  );
}
