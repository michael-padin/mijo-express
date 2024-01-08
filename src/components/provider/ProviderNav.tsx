"use client";

import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import React from "react";

import { Newspaper } from "lucide-react";
import { User } from "lucide-react";
import { History } from "lucide-react";
import { GitPullRequestArrow } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

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

export default function ProviderNav() {
  const [online, setOnline] = useState(false);
  var checkStat = "";

  const handleSwitchChange = () => {
    setOnline((prevOnline) => !prevOnline);
  };

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
        <div className="flex w-full flex-col justify-start border-r border-gray-300">
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/providerpage"
          >
            <Newspaper height={16} width={16} />
            Job Feed
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/providerpage/providerprofile"
          >
            <User height={16} width={16} />
            Profile
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/providerpage/providerhistory"
          >
            <History height={16} width={16} />
            History
          </Link>
          <Link
            className=" flex h-10 w-full flex-row items-center justify-start gap-5 bg-white pl-5  text-sm text-black hover:bg-yellow-400 hover:text-white  "
            href="/providerpage/providerrequest"
          >
            <GitPullRequestArrow height={16} width={16} />
            Job Request
          </Link>
        </div>

        <Card className="ml-3 w-11/12">
          <CardHeader>
            <h1>Set Availability</h1>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 space-x-2">
              {/* IF ALREADY ACCEPTED A WORK FOR THE MEANTIME */}

              <Switch
                id="airplane-mode"
                aria-pressed={online}
                onClick={handleSwitchChange}
                value={"Available | Unavailable"}
              />
              {online
                ? ((checkStat = "Available"),
                  (
                    <Label
                      className="font-poppins text-md ml-2"
                      htmlFor="airplane-mode"
                    >
                      Available
                    </Label>
                  ))
                : ((checkStat = "Unavailable"),
                  (
                    <Label
                      className="font-poppins text-md ml-2"
                      htmlFor="airplane-mode"
                    >
                      Unavailable
                    </Label>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
