"use client";
import Navbar from "@/components/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 mb-4">
              <img
                src="/images/cookie.png"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-4 border-blue-500"
              />
            </div>

            <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
          </div>
        </div>
        {/* Insert Chart Here */}
      </div>
    </div>
  );
};

export default page;
