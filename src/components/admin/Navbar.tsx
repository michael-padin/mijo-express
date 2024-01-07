"use client";

import { Bell, Info, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/common/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky w-full border-b px-5 py-4">
      <div className="flex justify-end">
        {/* <div className="flex items-center bg-muted px-4 rounded w-1/3">
					<Search />
					<Input
						placeholder="Search"
						className={cn(
							"border-0  outline-none ring-0 border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
						)}
					/>
				</div> */}
        <div className="flex gap-3">
          <ModeToggle />
          <Button variant={"ghost"} size="icon">
            <MessageSquare />
          </Button>
          <Button variant={"ghost"} size="icon">
            <Bell />
          </Button>
          <Button variant={"ghost"} size="icon">
            <Info />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
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
              <DropdownMenuItem>
                <Link href="admin/settings" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
