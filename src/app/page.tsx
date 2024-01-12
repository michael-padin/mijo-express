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

  return null;
}
