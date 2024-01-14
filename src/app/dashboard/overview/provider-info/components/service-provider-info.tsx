import React from "react";
import { Mail, MapPin, Phone, PhoneIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, formatJoinDate } from "@/lib/utils";
import Link from "next/link";

interface Profile {
  firstName: string;
  lastName: string;
  contactNumber: string;
  location: string;
  description: string;
  profileImg: string;
}

interface Availability {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface ProviderInfo {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  role: string;
  ServiceCategory: string[];
  availability: Availability[];
  blockedTimeSlots: string[];
  createdAt: string;
  startingPrice: number;
  description: string;
  profileImg: string;
  contactNumber: string;
}

type ProviderCardProps = {
  providerInfo: ProviderInfo;
};

const ProviderCard = ({ providerInfo }: ProviderCardProps) => {
  const {
    fullName,
    profileImg,
    description,
    createdAt,
    email,
    contactNumber,
    startingPrice = 400,
    address,
    _id,
  } = providerInfo;

  return (
    <div className="flex-1">
      <div className="">
        <div className="mt-4 flex items-center gap-2">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profileImg} alt="@shadcn" />
            <AvatarFallback>
              {fullName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex">
            {/* <h1>{fullName}</h1>
                  <div className="inline-flex items-center gap-1 text-sm">
                    <StarFilledIcon className="" />
                    <span className="font-semibold">5.0</span>
                    <span>(400)</span>
                  </div> */}
            <div className="flex flex-col gap-2 font-medium">
              <p>
                {fullName}
                <time
                  dateTime={createdAt.toString()}
                  className="block text-xs text-gray-500 dark:text-gray-400"
                >
                  {address}
                </time>
              </p>
              <div className="inline-flex items-center gap-1 text-sm">
                <StarFilledIcon className="" />
                <span className="font-semibold">5.0</span>
                <span>(400)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-4 ">
        <div className="">
          <span className="text-sm text-muted-foreground">Description</span>
          <p className="">{description}</p>
        </div>
        <div className="">
          <span className="text-sm text-muted-foreground">Contact Info</span>
          <div className="flex flex-col gap-2">
            <p className="flex items-center  gap-2">
              <PhoneIcon size={20} className="text-primary" /> {contactNumber}
            </p>
            <p className="flex items-center  gap-2">
              <Mail size={20} className="text-primary" />
              {email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
