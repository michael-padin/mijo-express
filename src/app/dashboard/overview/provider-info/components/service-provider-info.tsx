"use client";
import { Mail, PhoneIcon } from "lucide-react";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewCard from "./review-card/review-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
  reviews: any[];
};

const ProviderCard = ({ providerInfo, reviews }: ProviderCardProps) => {
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

  const totalRatings =
    reviews.reduce((acc, rating) => acc + rating.customerRating, 0) /
    reviews.length;

  return (
    <div className="flex-1">
      <div className="">
        <div className="flex items-center gap-2">
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
              {reviews.length > 0 && (
                <Link
                  className="inline-flex items-center gap-1 text-sm hover:underline"
                  href="#reviews"
                >
                  <StarFilledIcon color="gold" />
                  <span className="font-semibold">
                    {totalRatings.toFixed(1)}
                  </span>
                  <span>{`(${reviews.length})`}</span>
                </Link>
              )}
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
        <div className="mt-10" id="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                See what other customers say about this provider.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.map((review) => (
                <ReviewCard reviewInfo={review} key={review._id} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
