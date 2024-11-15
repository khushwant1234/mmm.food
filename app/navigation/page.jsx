import React from 'react'
import Link from "next/link";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ffffff] p-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <Link href="/route1">
          <div className="relative bg-[#feb951] text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-4 text-center"> Home</h2>
            
            <div className="absolute top-0 w-32 h-32">
              <Image src="/images/cookie.png" alt="Cookie" height={40} width={40} objectFit="contain" />
            </div>
          </div>
        </Link>

        {/* Card 2 */}
        <Link href="/route2">
          <div className="relative bg-[#77c1e4] text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-4 text-center">Seasonal Recipes</h2>
           
            <div className="absolute top-0 w-32 h-32">
              <Image src="/images/cookie.png" alt="Cookie" height={40} width={40} objectFit="contain" />
            </div>
          </div>
        </Link>

        {/* Card 3 */}
        <Link href="/route3">
          <div className="relative bg-[#feb951] text-[#ffffff] p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-4 text-center">Quick Meals</h2>
           
            <div className="absolute top-0 w-32 h-32">
              <Image src="/images/cookie.png" alt="Cookie" height={40} width={40} objectFit="contain" />
            </div>
          </div>
        </Link>

        {/* Card 4 */}
        <Link href="/route4">
          <div className="relative bg-[#77c1e4] text-white p-6 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer overflow-hidden">
            <h2 className="text-4xl font-extrabold mb-4 text-center">Leftover Management</h2>
            
            <div className="absolute top-0 w-32 h-32">
              <Image src="/images/cookie.png" alt="Cookie" height={40} width={40} objectFit="contain" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default page
