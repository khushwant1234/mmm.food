"use client";
import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const page = () => {
  const words = `Oxygen gets you high. In a catastrophic emergency, we're taking giant, panicked breaths. Suddenly you become euphoric, docile. You accept your fate. It's all right here. Emergency water landing, six hundred miles an hour. Blank faces, calm as Hindu cows
`;

  const [heart, setHeart] = useState("/icons/heart-regular.svg");

  const handleHeart = () => {
    if (heart === "/icons/heart-solid.svg") {
      setHeart("/icons/heart-regular.svg");
    } else {
      setHeart("/icons/heart-solid.svg");
    }
  };

  const handleShare = () => {};

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-wrap sm:items-center justify-center  h-screen">
        <div className="sm:w-1/2 w-full mx-2 sm:mx-0 h-full  overflow-hidden relative">
          <Image
            src="/images/cookie.png"
            alt="card"
            fill
            className="object-cover"
          />
        </div>
        <div className="sm:w-1/2 w-full h-full p-8">
          <h3 className="text-2xl font-bold mb-4">Chocolate Chip Cookie</h3>
          <div className="flex flex-col items-start justify-start sm:justify-center">
            <div className="flex items-center justify-center mb-4 gap-2 ">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-6 h-6 ${
                    index < 4
                      ? "text-yellow-400"
                      : index === 4
                      ? "text-yellow-400/50"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">4</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleHeart}
                className="h-7 w-7 rounded-full  dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <Image src={heart} alt="Like" height={40} width={40}></Image>
              </button>
              <button
                onClick={handleShare}
                className="h-7 w-7 rounded-full  dark:bg-neutral-800 flex items-center justify-center group/button"
              >
                <Image
                  src="/icons/share-solid.svg"
                  alt="Like"
                  height={40}
                  width={40}
                ></Image>
              </button>
            </div>
          </div>

          <h2 className="text-xl font-bold mt-6 mb-3">Ingredients</h2>
          <ul className="list-disc pl-5 mb-4">
            {[
              "All-purpose flour",
              "Chocolate chips",
              "Brown sugar",
              "Butter",
              "Eggs",
            ].map((ingredient, index) => (
              <li key={index} className="mb-1">
                {ingredient}
              </li>
            ))}
          </ul>

          <TextGenerateEffect words={words} />

          <h2 className="text-xl font-bold mt-6 mb-3">Nutritional Value</h2>
          <div className="flex items-center justify-center">
            <Drawer>
              <DrawerTrigger>Missing Some Ingredients?</DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerDescription>
                    {/* This action cannot be undone. */}
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
