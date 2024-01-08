"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import React from "react";

const Profile = () => {
  const session = useSession();

  console.log(session.data?.user);
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t bg-background p-4">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={session.data?.user.profile.profileImg}
            alt="@shadcn"
          />
          <AvatarFallback>
            {session.data?.user.fullName.substring(0, 2).toUpperCase() || "CN"}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <h3 className="font-semibold">{session.data?.user.fullName}</h3>
          <p className="text-sm">{session.data?.user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
