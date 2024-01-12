"use client";
import { Loader2Icon } from "lucide-react";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { MapPinned } from "lucide-react";
import { Phone } from "lucide-react";
import { MailOpen } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import App from "next/app";
import Autoplay from "embla-carousel-autoplay";
import AppReviewCard from "./components/app-review-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CardContent {
  avatarSrc: string;
  avatarAlt: string;
  avatarFallback: string;
  cardDescription: string;
  cardContent: string;
}

const testReviewAppData = Array.from({ length: 10 }, (_, i) => ({
  profileImg: `https://randomuser.me/api/portraits/women/${i + 1}.jpg`,
  fullName: `User ${i + 1}`,
  address: `Address ${i + 1}`,
  description: `This is a description for User ${i + 1}.`,
  createdAt: new Date(),
}));

const homeNavLinks = [
  { label: "Home", href: "/" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   router.push("/login");
  // }, [router]);

  return (
    // <div className="flex h-screen items-center justify-center">
    //   <Loader2Icon className="animate-spin" size={30} />
    // </div>
    <div className=" overflow-x-hidden">
      <div className="relative h-[60vh] w-full border border-b">
        <div className="flex justify-between  p-5 ">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-black">
              <span className="text-primary">MiJo </span> Express
            </h1>
          </div>
          <ul className="z-50 flex items-center gap-2">
            {homeNavLinks.map((item, index) => (
              <li
                key={item.href}
                className={`${
                  item.href === "/register"
                    ? cn(buttonVariants({ variant: "default" }))
                    : cn(buttonVariants({ variant: "ghost" }))
                }`}
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Image
          src="images/cover.svg"
          alt="landing-image"
          fill
          objectFit="contain"
        />
        <div className="absolute -bottom-24 left-0 right-0 m-auto flex   max-w-[1024px] justify-center gap-5 overflow-x-hidden">
          {/* <Separator /> */}

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-xl font-black text-primary">
                About{" "}
                <span className="text-muted-foreground ">Our Service</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex text-muted-foreground">
              <p>
                Mijo Express is an online platform where customers effortlessly
                find the service providers they need. With a powerful search
                function and transparent service provider profiles, users can
                quickly locate qualified professionals. The platforms
                user-friendly design, secure booking system, and efficient
                communication features redefine the process of connecting
                customers with reliable service providers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* REVIEW CARDS SECTION */}
      <div className=" m-auto mb-10 mt-32 max-w-[1024px]">
        <h1 className="p-6 text-center text-xl font-black text-primary">
          Rate <span className="text-muted-foreground ">and Review</span>
        </h1>
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {testReviewAppData.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <AppReviewCard key={index} {...item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* FOOTER SECTION */}
      <div className="overflow-x-hidden bg-primary">
        {/* CONTACTS */}
        <div className="m-auto max-w-[1024px]">
          <div className="flex flex-row justify-between py-10">
            <div className="flex flex-row items-center justify-center gap-3">
              <MapPinned />
              <div className="flex flex-col gap-1">
                <h5>Find Us</h5>
                <a href="">Poblacion, Argao, Cebu</a>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <Phone />
              <div className="flex flex-col gap-1">
                <h5>Call Us</h5>
                <p>09465398213 / 481-6593</p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-3">
              <MailOpen />
              <div className="flex flex-col gap-1">
                <h5>Email Us</h5>
                <p>mijo-express@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        {/* SEND AN EMAIL */}
      </div>
    </div>
  );
}
