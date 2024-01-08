"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import Link from "next/link";

import hammer from "../../../public/images/hammer.jpg";
import Image from "next/image";

export default function MainNavbar() {
  return (
    <div className="fixed flex h-20 w-full flex-row items-center justify-between bg-white px-10 shadow-xl">
      <div className="flex flex-row items-center justify-center gap-2">
        <Image src={hammer} alt="logo" height={50} width={50} />
        <h1 className="font-poppins text-lg">
          Mi<span>Jo</span> Express
        </h1>
      </div>
      <NavigationMenu>
        <NavigationMenuList className="font-poppins flex flex-row gap-3">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Login
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signup" legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-yellow-300 text-black`}
              >
                Register
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
