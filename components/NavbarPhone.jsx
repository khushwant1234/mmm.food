import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
    IconHome,
  } from "@tabler/icons-react";

const NavbarPhone = () => {
  return (
    <div className="sm:hidden flex justify-center items-center h-14 w-full ">
      
      <Sheet>
        <SheetTrigger asChild className="flex items-center justify-center">
          <Image
            src="/images/bars-solid.svg"
            alt="Pages"
            width={28}
            height={28}
          ></Image>
        </SheetTrigger>
        <SheetContent className="bg-[#071952]">
          <SheetHeader>
            <SheetTitle className="text-center text-white">Pages</SheetTitle>
          </SheetHeader>
          <div className="">
            <div className="flex flex-col gap-2 mt-2">
              <Link href="/">
                <Button className="w-full text-black bg-white"><IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />Home</Button>
              </Link>
              <Link href="/Courses">
                <Button className="w-full text-black bg-white">
                <Image src="/images/cloud-sun-solid.svg" width={20} height={10} alt="S"/>
                Seasonal Recipes
                </Button>
              </Link>
              <Link href="/Notes">
                <Button className="w-full text-black bg-white"><Image src="/images/gauge-high-solid.svg" width={20} height={10} alt="S"/>Quick Meals</Button>
              </Link>
              <Link href="/About">
                <Button className="w-full text-black bg-white"><Image src="/images/cookie-bite-solid.svg" width={20} height={10} alt="S"/>Leftovers Management</Button>
              </Link>
              <Link href="/Settings">
                <Button className="w-full text-black bg-white"><Image src="/images/user-regular.svg" width={17} height={10} alt="S"/>Profile</Button>
              </Link>
            </div>
            {/* <div className="">
              <SheetClose asChild>
                <Link href="/">
                  <Button type="submit" className="w-full">
                    Logout
                  </Button>
                </Link>
              </SheetClose>
            </div> */}
          </div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarPhone;
