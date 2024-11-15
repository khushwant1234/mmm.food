import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NavbarPhone = () => {
  return (
    <div className="sm:hidden flex justify-center items-center h-14 w-full gap-5 ">
      <Link href="/">
      <Button variant="outline" className="w-32"><Image src="/icons/map-solid.svg" width={17} height={10} alt="S"/></Button>
      </Link>
      <Link href="/">
      <Button variant="outline" className="w-32"><Image src="/icons/user-regular.svg" width={17} height={10} alt="S"/></Button>
      </Link>
      
    </div>
  );
};

export default NavbarPhone;
