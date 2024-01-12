import React from "react";
import { MapPin, Phone } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SubmitRequestForm from "./SubmitRequestForm";
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
    startingPrice = 400,
    address,
    _id,
  } = providerInfo;

  return (
    <Dialog>
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col">
            <div className="h-full">
              <div className="mt-4 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={profileImg} alt="@shadcn" />
                  <AvatarFallback>
                    {fullName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  {/* <h1>{fullName}</h1>
                  <div className="inline-flex items-center gap-1 text-sm">
                    <StarFilledIcon className="" />
                    <span className="font-semibold">5.0</span>
                    <span>(400)</span>
                  </div> */}
                  <div className="font-medium dark:text-white">
                    <p>
                      {fullName}
                      <time
                        dateTime={createdAt.toString()}
                        className="block text-xs text-gray-500 dark:text-gray-400"
                      >
                        {address}
                      </time>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-4 ">
              <div className="h-24">
                <span className="text-xs text-muted-foreground">
                  Description
                </span>
                <p className="text-sm ">{`${description.slice(0, 90)}...`}</p>
              </div>
              <div className="flex flex-col gap-2 ">
                <div className="inline-flex items-center gap-1 text-sm">
                  {/* <StarFilledIcon className="" />
                  <span className="font-semibold">5.0</span>
                  <span>(400)</span> */}
                </div>
                <p className="text-sm font-semibold">{`From  ₱${startingPrice.toString()}`}</p>
                <Link
                  href={`/customer/feed/provider-info/${_id}`}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Request a service
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-[425px]">
        <SubmitRequestForm providerInfo={providerInfo} />
      </DialogContent>
    </Dialog>
  );
};

export default ProviderCard;
