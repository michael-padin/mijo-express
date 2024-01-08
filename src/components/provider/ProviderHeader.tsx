"use client";

//SHADCN
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import Link from "next/link";

export default function ProviderHeader() {
  return (
    <div className="mt-5 flex h-20 w-full flex-row justify-around gap-10">
      <div className="flex items-center justify-start gap-2 pl-10">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search here"
            className=" w-96 rounded-lg border border-gray-300 py-2 pl-8 pr-4 focus:border-blue-500 focus:outline-none"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35M15 10.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
              />
            </svg>
          </div>
        </div>
        <Button className="w-32" type="submit">
          Search
        </Button>
      </div>

      <div className="flex flex-row items-center justify-end gap-5">
        {/* NOTIFICATIONS SHEET */}
        <DropdownMenu>
          <DropdownMenuTrigger className="border-1.5 rounded-full border-gray-200 bg-white p-2 hover:bg-yellow-300">
            <Image
              src="/images/bell.png"
              width={25}
              height={25}
              alt="Notification Icon"
            ></Image>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-56 w-72">
            {/* <h1 className="font-poppins text-lg">Notifications</h1> */}
            <div className="flex flex-row items-center justify-around gap-10">
              <DropdownMenuLabel className="text-md">
                Notifications
              </DropdownMenuLabel>
              <Link
                className="text-blue text-sm underline-offset-8"
                href="/providerpage/providernotification"
              >
                View All
              </Link>
            </div>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        {/* MESSAGES SHEET  */}
        <Sheet>
          <SheetTrigger className="border-1.5 rounded-full border-gray-200 bg-white p-2 hover:bg-yellow-300">
            <Image
              src="/images/email.png"
              width={25}
              height={25}
              alt="Message Icon"
            />
          </SheetTrigger>
          <SheetContent>
            {/* PUT HERE THE COMPONENT OF MESSAGES */}
            <SheetHeader>
              <SheetTitle>Are you sure absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-poppins">John Kyle</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="border-1.5 rounded-full border-gray-200 bg-white p-2 hover:bg-yellow-300">
              <Image
                src="/images/down.png"
                width={25}
                height={25}
                alt="Dropdown Icon"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Switch as Customer</DropdownMenuItem>
              <DropdownMenuItem></DropdownMenuItem>
              <DropdownMenuItem>Next app</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
