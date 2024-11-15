"use client";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconHome } from "@tabler/icons-react";
import Image from "next/image";
import NavbarPhone from "@/components/NavbarPhone";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Seasonal Recipes",
      icon: (
        <Image
          src="/icons/cloud-sun-solid.svg"
          width={20}
          height={10}
          alt="S"
        />
      ),
      href: "/seasonal",
    },
    {
      title: "Quick Meals",
      icon: (
        <Image
          src="/icons/gauge-high-solid.svg"
          width={20}
          height={10}
          alt="Q"
        />
      ),
      href: "/quick",
    },
    {
      title: "Leftovers",
      icon: (
        <Image
          src="/icons/cookie-bite-solid.svg"
          width={20}
          height={10}
          alt="L"
        />
      ),
      href: "/leftover",
    },
    {
      title: "Blend",
      icon: (
        <Image src="/icons/blender-solid.svg" width={17} height={10} alt="B" />
      ),
      href: "/blend",
    },
    {
      title: "Profile",
      icon: (
        <Image src="/icons/user-regular.svg" width={17} height={10} alt="P" />
      ),
      href: "/profile",
    },
  ];
  return (
    <div className="sticky bottom-0 z-40">
      <div className="flex items-center justify-center h-14 w-full bottom-4 fixed">
        <FloatingDock
          mobileClassName="translate-y-20" // only for demo, remove for production
          items={links}
        />
      </div>
      <NavbarPhone />
    </div>
  );
};

export default Navbar;
