"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

import { FocusCards } from "@/components/ui/focus-cards";

const page = () => {
  const [visible, setVisible] = useState("hidden");
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

  const handleSubmit = (e) => {
    setVisible("visible");
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div className="w-full h-screen ">
      <Navbar />

      <div className="flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto mt-8 mb-4 px-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Have leftovers? they won't go wasted..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Get Recipes
            </button>
          </div>
        </form>

        <FocusCards cards={cards} />
      </div>
    </div>
  );
};

export default page;
