"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/moving-border";

import { FocusCards } from "@/components/ui/focus-cards";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleBlend = async () => {
    setIsLoading(true);
    // Simulate some processing time (replace with your actual blend logic)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // Add your blending logic here
    } catch (error) {
      console.error("Blending failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="w-full h-screen relative">
      {isLoading && (
        <div className="absolute inset-0 z-50">
          <div className="absolute top-1/2 left-1/2 animate-move-center">
            <div className="w-32 h-32 rounded-full mix-blend-multiply bg-pink-500" />
          </div>
          <div className="absolute top-1/2 right-1/2 animate-move-center-right">
            <div className="w-32 h-32 rounded-full mix-blend-multiply opacity-70 bg-blue-500" />
          </div>
        </div>
      )}

      <Navbar />

      <div className="flex flex-col items-center justify-center mt-3">
        <div>
          <Button
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-red-500 dark:border-slate-800"
            onClick={handleBlend}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                Blending...
              </div>
            ) : (
              "BLEND"
            )}
          </Button>
        </div>

        <FocusCards cards={cards} />
      </div>
    </div>
  );
};

export default page;
