import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const NavbarPhone = () => {
  return (
    <div className="sm:hidden flex justify-center items-center h-14 w-full gap-5 mt-1 ">
      <Link href="/navigation">
        <Button variant="outline" className="w-32">
          <Image
            src="/icons/map-solid.svg"
            width={17}
            height={10}
            alt="Navigation"
          />
        </Button>
      </Link>
      <Link href="/profile">
        <Button variant="outline" className="w-32">
          <Image
            src="/icons/user-regular.svg"
            width={17}
            height={10}
            alt="Profile"
          />
        </Button>
      </Link>
    </div>
  );
};

export default NavbarPhone;
