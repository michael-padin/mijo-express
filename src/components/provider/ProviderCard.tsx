"use client";

import React from "react";
import { Card, CardContent } from "../ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { MapPin, Phone } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Form } from "../ui/form";

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

interface ProviderInfo {
  id: string;
  fullName: string;
  email: string;
  password: string;
  address: string;
  role: string;
  profile: Profile;
  ServiceCategory: string[];
  availability: Availability[];
  blockedTimeSlots: string[];
}

type ProviderCardProps = {
  providerInfo: ProviderInfo;
};

const ProviderCard = ({ providerInfo }: ProviderCardProps) => {
  const { profile, fullName } = providerInfo;
  return (
    <Dialog>
      <Card className="w-[280px] overflow-hidden">
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="">
              <div className="mt-4 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={profile.profileImg} alt="@shadcn" />
                  <AvatarFallback>
                    {fullName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <h1>{fullName}</h1>
                  <div className="inline-flex items-center gap-1 text-sm">
                    <StarFilledIcon className="" />
                    <span className="font-semibold">5.0</span>
                    <span>(400)</span>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <span className="text-xs text-muted-foreground">Description</span>
              <p className="text-sm ">{profile.description}</p>
              {/* <p className="text-sm font-semibold">{price.toString()}</p> */}
              <div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  <p className="text-sm ">{profile.location}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Phone size={15} />
                  <p className="text-sm ">{profile.contactNumber}</p>
                </div>
              </div>
            </div>
            <Separator />

            <DialogTrigger asChild>
              <Button>Assign a job</Button>
            </DialogTrigger>
          </div>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-[425px]">
        <form action="">
          <DialogHeader>
            <div className="">
              <div className="mt-4 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={profile.profileImg} alt="@shadcn" />
                  <AvatarFallback>
                    {fullName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <h1>{fullName}</h1>
                  <div className="inline-flex items-center gap-1 text-sm">
                    <StarFilledIcon className="text-yellow-400" />
                    <span className="font-semibold">5.0</span>
                    <span>(400)</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="">
                <span className="text-xs text-muted-foreground">
                  Description
                </span>
                <p className="text-sm ">{profile.description}</p>
              </div>
              {/* <p className="text-sm font-semibold">{price.toString()}</p> */}
              <div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  <p className="text-sm ">{profile.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} />
                  <p className="text-sm ">{profile.contactNumber}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col ">
              <span className="text-xs text-muted-foreground">
                Availability
              </span>
              <div className="flex flex-col ">
                {providerInfo.availability.map((availability, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm ">
                    <p>{availability.dayOfWeek}</p>
                    <p>
                      {availability.startTime} - {availability.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <span className="text-xs text-muted-foreground">
                Select Service Category
              </span>
              <div className="flex flex-col gap-2">
                {providerInfo.ServiceCategory.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <p>{category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProviderCard;
