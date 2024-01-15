"use client";

import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ModeToggle from "./mode-toggle";
import { usePathname } from "next/navigation";
import SearchProviderInput from "./search-provider-input";

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();

  return (
    <div className="sticky w-full border-b px-5 py-4">
      <div className="flex justify-between">
        <div className="w-1/2">
          {session.data?.user.role === "customer" &&
            pathname.includes("overview") && <SearchProviderInput />}
        </div>
        <div className="flex gap-3">
          <ModeToggle />
          {/* <Button variant={"ghost"} size="icon">
            <MessageSquare />
          </Button>
          <Button variant={"ghost"} size="icon">
            <Bell />
          </Button>
          <Button variant={"ghost"} size="icon">
            <Info />
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={session.data?.user.profileImg}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {session.data?.user.fullName.substring(0, 2).toUpperCase() ||
                    "CN"}
                </AvatarFallback>
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
              <DropdownMenuItem onClick={async () => await signOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
