"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const RecipeDisplaySwipe = () => {
  const [direction, setDirection] = useState(null);
  const [cards, setCards] = useState([
    { id: 1, content: "Card 1" },
    { id: 2, content: "Card 2" },
    { id: 3, content: "Card 3" },
    { id: 4, content: "Card 1" },
    { id: 5, content: "Card 2" },
    { id: 6, content: "Card 3" },
    // Add more cards as needed
  ]);

  const swipeCard = (cardId, direction) => {
    setDirection(direction);
    console.log("Swiped", direction, "on card:", cardId);
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="relative w-full h-full sm:w-80 sm:h-96">
        <AnimatePresence>
          {cards.length > 0 && (
            <motion.div
              key={cards[0].id}
              className="absolute w-full h-full bg-white rounded-2xl shadow-xl cursor-grab overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -100) swipeCard(cards[0].id, "left");
                if (swipe > 100) swipeCard(cards[0].id, "right");
              }}
              whileDrag={{
                scale: 1.05,
              }}
              animate={{
                scale: 1,
                rotate: 0,
                x: 0,
              }}
              exit={{
                x: direction === "left" ? -500 : 500,
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 },
              }}
            >
              <Image
                src="/images/pizza.png"
                alt="pizza"
                draggable="false"
                fill
              ></Image>

              <div className=" absolute bottom-0 h-12 w-full rounded-2xl items-center bg-transparent backdrop-blur-lg  justify-center text-2xl font-bold">
                <Link href={`/`}>
                  <p className="absolute bottom-3 left-3 bg-transparent rounded-2xl backdrop-blur-lg ">
                    {cards[0].content}
                  </p>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipeDisplaySwipe;
