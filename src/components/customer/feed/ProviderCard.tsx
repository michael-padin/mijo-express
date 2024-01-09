import React from "react";
import { MapPin, Phone } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SubmitRequestForm from "./SubmitRequestForm";

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
      <Card className=" overflow-hidden">
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
        <SubmitRequestForm providerInfo={providerInfo} />
      </DialogContent>
    </Dialog>
  );
};

export default ProviderCard;
