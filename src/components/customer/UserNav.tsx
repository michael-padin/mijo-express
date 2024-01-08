"use client";

// ICONS
import { BookCopy } from "lucide-react";
import { User } from "lucide-react";
import { Contact2 } from "lucide-react";
import { History } from "lucide-react";
import { Star } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

type Provider = {
  id: number;
  name: string;
  profilePic: string;
};

const provider: Provider = {
  id: 1,
  name: "kyle",
  profilePic: "/images/sampleProvider.jpg",
};

export default function UserNav() {
  return (
    <div className="fixed flex h-screen w-1/5 flex-col">
      {/* Provider Header */}
      <div
        className="m-5 flex flex-col items-center justify-center"
        key={provider.id}
      >
        <Image
          className="m-5 w-full rounded-t-lg"
          src={provider.profilePic}
          width={200}
          height={200}
          alt="Profile Picture"
        />
      </div>
      {/* Provider Navigation */}
      <div>
        <div className="flex w-full flex-col p-1">
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/userpage"
          >
            <BookCopy />
            User Feed
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/userpage/userprofile"
          >
            <User />
            User Profile
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/userpage/userappointment"
          >
            <Contact2 />
            Requested Appointments
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/userpage/userhistory"
          >
            <History />
            Service History
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/userpage/userreview"
          >
            <Star />
            Rate and Review
          </Link>
        </div>
      </div>
    </div>
  );
}
