"use client";
import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const Hero = () => {
  const words = ["Yummiest", "Most Delicious", "Mouth Watering", "Scrumptious"];
  return (
    <div className=" hidden min-[1007px]:flex justify-center w-full gap-28 mt-5">
      <div className="flex flex-col h-60  w-1/3 justify-start items-center px-4 border-r-2 border-black border-2 pt-4 rounded-xl">
        <div className="min-[1007px]:text-3xl text-2xl font-normal">
          The <FlipWords words={words} />
          recipe of the Day is:
        </div>
        <div className=" font-normal text-neutral-600 dark:text-neutral-400">
          <h3 className="text-xl text-orange-600 ">
            {/*Insert Recipe of the Day here */}Name Creamy Tuscan Chicken
          </h3>
          <p className="text-gray-600  line-clamp-2 pb-1">
            A delicious Italian-inspired dish with sun-dried tomatoes, spinach,
            and a rich cream sauce.
          </p>
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 "
          >
            <span>View Recipe</span>
          </HoverBorderGradient>
        </div>
      </div>
      <div className="h-60 w-1/3 px-7 border-2 border-black pt-4 rounded-xl">
        <div className="min-[1007px]:text-3xl text-2xl font-normal">
          Double the taste, double the fun!
        </div>
        <h3 className="text-xl text-orange-600 mt-1 mb-2">
          See what happens when you Blend your cravings with a friend’s.
        </h3>

        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>Blend</span>
        </HoverBorderGradient>
      </div>
    </div>
  );
};

export default Hero;
