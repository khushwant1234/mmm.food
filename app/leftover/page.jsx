"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero";
import { FocusCards } from "@/components/ui/focus-cards";

const page = () => {
  const cards = [
    {
      title: "Forest Adventure",
      src: "/images/cookie.png",
    },
    {
      title: "Valley of life",
      src: "/images/cookie.png",
    },
    {
      title: "Sala behta hi jayega",
      src: "/images/output-final.png",
    },
    {
      title: "Camping is for pros",
      src: "/images/pizza.png",
    },
    {
      title: "The road not taken",
      src: "/images/cookie.png",
    },
    {
      title: "The First Rule",
      src: "/images/cookie.png",
    },
  ];
  return (
    <div className=" w-full h-screen">
      <Navbar />

      <div className="flex flex-col items-center justify-center ">
        <Hero />
        <FocusCards cards={cards} />
      </div>
    </div>
  );
};

export default page;
