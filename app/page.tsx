"use client";
import { useState } from "react";
import BurguerMenu from "./components/BurguerMenu";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Bio from "./components/Bio";
import Music from "./components/Music";
import Social from "./components/Social";
import Footer from "./components/Footer";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar open={isOpen} setOpen={setIsOpen}></Navbar>
      <Hero></Hero>
      <Bio></Bio>
      <Music></Music>
      <Social></Social>
      <Footer></Footer>
      <BurguerMenu open={isOpen} setOpen={setIsOpen}></BurguerMenu>
    </div>
  );
}
