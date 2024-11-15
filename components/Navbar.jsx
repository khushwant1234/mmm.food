'use client'
import React from 'react'
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
} from "@tabler/icons-react";
import Image from "next/image";
import NavbarPhone from "@/components/NavbarPhone";

const Navbar = () => {
    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
     
        {
          title: "Seasonal Recipes",
          icon: (
            <Image src="/images/cloud-sun-solid.svg" width={20} height={10} alt="S"/>
          ),
          href: "#",
        },
        {
          title: "Quick Meals",
          icon: (
            <Image src="/images/gauge-high-solid.svg" width={20} height={10} alt="S"/>
          ),
          href: "#",
        },
        {
          title: "Leftovers",
          icon: (
            <Image src="/images/cookie-bite-solid.svg" width={20} height={10} alt="S"/>
          ),
          href: "#",
        },
        {
          title: "Profile",
          icon: (
            <Image src="/images/user-regular.svg" width={17} height={10} alt="S"/>
          ),
          href: "#",
        },
      ];
  return (
    <div className='sticky top-0 z-40'>
      <div className="flex items-center justify-center h-14 w-full bottom-4 fixed">
      <FloatingDock
        mobileClassName="translate-y-20" // only for demo, remove for production
        items={links}
        />
        </div>
    <NavbarPhone />
    </div>
  )
}

export default Navbar
