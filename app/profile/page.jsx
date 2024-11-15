import React from 'react'
import {Button} from "@/components/ui/button";

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
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
        <div className='h-40 w-full bg-gray-50 flex justify-center items-center'>
        <Button variant="outline" className="italic bold">Blend</Button>
        </div>
    </div>
  )
}

export default page
