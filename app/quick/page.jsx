import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import { AnimatedTestimonialsDemo } from "@/components/QuickPageCards";
import { Suspense } from "react";

const Page = async () => {
  return (
    <div>
      <Navbar />
      <div>
        <Hero />
        <div>
          <Suspense fallback={<div>Loading quick meals...</div>}>
            <AnimatedTestimonialsDemo />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Page;
