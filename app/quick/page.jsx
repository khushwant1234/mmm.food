import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import { AnimatedTestimonialsDemo } from "@/components/QuickPageCards";

const page = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <Hero></Hero>
        <div>
          <AnimatedTestimonialsDemo></AnimatedTestimonialsDemo>
        </div>
      </div>
    </div>
  );
};

export default page;
