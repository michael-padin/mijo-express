"use client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import landingImage from "../../public/images/cover.svg";

import { MapPinned } from "lucide-react";
import { Phone } from "lucide-react";
import { MailOpen } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CardContent {
  avatarSrc: string;
  avatarAlt: string;
  avatarFallback: string;
  cardDescription: string;
  cardContent: string;
}

const cardContentData: CardContent[] = [
  {
    avatarSrc: "https://github.com/shadcn.png",
    avatarAlt: "@shadcn",
    avatarFallback: "CN",
    cardDescription: "John Kyle",
    cardContent:
      "Absolutely thrilled with the service! The team went above and beyond to ensure a seamless and successful experience.",
  },
  {
    avatarSrc: "https://example.com/user2.png",
    avatarAlt: "@user2",
    avatarFallback: "U2",
    cardDescription: "Jane Doe",
    cardContent:
      "Exceptional service! Timely and professional throughout the entire process.",
  },
  {
    avatarSrc: "https://example.com/user3.png",
    avatarAlt: "@user3",
    avatarFallback: "U3",
    cardDescription: "Alex Johnson",
    cardContent:
      "The service exceeded my expectations! Courteous and skilled professionals who ensured a smooth experience.",
  },
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
    <div className="w-screen overflow-x-hidden">
      <div className="h-[60vh] w-full">
        <Image
          src={landingImage}
          alt="landing-image"
          objectFit="cover"
          className="h-[60vh] w-screen"
        />
        <div className="-mt-96 mb-40 flex h-32 w-screen flex-row justify-between p-10">
          <div className="flex flex-row justify-between">
            <h3 className="text-3xl font-bold text-yellow-500">
              Mijo <span className="text-black">Express</span>
            </h3>
          </div>
          <ul className="flex flex-row gap-0">
            <li className="flex h-16 w-32 scale-105 cursor-pointer items-center justify-center text-black hover:text-yellow-500">
              <Link href="">Home</Link>
            </li>
            <li className="flex h-16 w-32 scale-105 cursor-pointer items-center justify-center text-black hover:text-yellow-500">
              <Link href="login">Login</Link>
            </li>
            <li className="flex h-16 w-32 cursor-pointer items-center justify-center border-2 border-yellow-500 text-yellow-500 hover:scale-105 hover:text-yellow-500">
              <Link href="register">Register</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ABOUT SECTION HERE */}
      <div className="flex w-screen flex-col justify-start gap-5 overflow-x-hidden p-16">
        <Separator />
        <h2 className="text-8xl font-black text-yellow-500">
          About <span className="text-black">our Service</span>
        </h2>
        <p>
          Mijo Express is an online platform where customers effortlessly find
          the service providers they need.
          <br />
          With a powerful search function and transparent service provider
          profiles, users can quickly locate qualified professionals.
          <br />
          The platforms user-friendly design, secure booking system, and
          efficient communication features redefine the process of <br />
          connecting customers with reliable service providers.
        </p>
      </div>

      {/* REVIEW CARDS SECTION */}
      <div className="mb-10 w-screen overflow-x-hidden px-10">
        <Separator />
        <h2 className="my-10 text-8xl font-black text-yellow-500">
          Rate <span className="text-black">and Review</span>
        </h2>
        <div className="flex flex-row items-center justify-start gap-10">
          {cardContentData.map((item, index) => (
            <Card key={index} className="h-[400px] w-1/4">
              <CardHeader>
                <Avatar>
                  <AvatarImage src={item.avatarSrc} alt={item.avatarAlt} />
                  <AvatarFallback>{item.avatarFallback}</AvatarFallback>
                </Avatar>
                <CardDescription>{item.cardDescription}</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent>
                <p className="m-2">{item.cardContent}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="w-screen overflow-x-hidden bg-yellow-500">
        {/* CONTACTS */}
        <div className="flex flex-row justify-around p-10">
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
        {/* SEND AN EMAIL */}
      </div>
    </div>
  );
}
