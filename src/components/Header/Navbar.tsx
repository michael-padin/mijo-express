import Image from "next/image";
import React from "react";
import { Heart, Mail, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Placeholder from "../../assets/placeholder.jpg";
import CategoryMenu from "./CategoryMenu";

const Header = () => {
  return (
    <>
      <div className="w-full  py-2">
        <header className="m-auto max-w-5xl">
          <div className="m-auto flex items-center gap-2">
            <div>
              <Image
                src={Placeholder}
                alt="mijo express logo"
                width={80}
                height={50}
                placeholder="blur"
                blurDataURL="data:image/jpeg"
              />
            </div>
            <div className="flex h-11 w-full items-center">
              <Input
                className="h-full rounded-r-none "
                placeholder="What services are you looking for?"
              />
              <Button className="h-full rounded-l-none">
                <Search />
              </Button>
            </div>
            <div className="flex ">
              <Button className="h-full" variant="ghost">
                <Mail />
              </Button>
              <Button className="h-full" variant="ghost">
                <Heart />
              </Button>
            </div>
            <div className="flex ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Become a provider</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      </div>
      <CategoryMenu />
    </>
  );
};

export default Header;
