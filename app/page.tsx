"use client";
import { useState } from "react";
import BurguerMenu from "./components/BurguerMenu";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Bio from "./components/Bio";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      <Navbar open={isOpen} setOpen={setIsOpen}></Navbar>
      <Hero></Hero>
      <Bio></Bio>
      <BurguerMenu open={isOpen} setOpen={setIsOpen}></BurguerMenu>
    </div>
  );
}
