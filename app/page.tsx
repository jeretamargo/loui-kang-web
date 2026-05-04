"use client";
import { useEffect, useRef, useState } from "react";
import BurguerMenu from "./components/BurguerMenu";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Bio from "./components/Bio";
import Music from "./components/Music";
import Social from "./components/Social";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

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
      {!isVideoLoaded && <Loader />}
      <div className={`${!isVideoLoaded ? "opacity-0" : "opacity-100"}`}>
        <header>
          <Navbar
            open={isOpen}
            setOpen={setIsOpen}
            isHeroVisible={isHeroVisible}
          ></Navbar>
        </header>
        <main>
          <Hero heroRef={heroRef} setIsVideoLoaded={setIsVideoLoaded}></Hero>
          <Bio></Bio>
          <Music></Music>
          <Social></Social>
        </main>
        <footer>
          <Footer></Footer>
        </footer>
        <BurguerMenu open={isOpen} setOpen={setIsOpen}></BurguerMenu>
      </div>
    </div>
  );
}
