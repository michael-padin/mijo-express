"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import { Button } from "../ui/button";

type providerhistory = {
  id: number;
  customerName: string;
  address: string;
  contactNumber: string;
  date: string;
  imageUrl: string;
};

interface ProviderHistoryCardProps {
  ProviderHistoryData: providerhistory[];
}

export default function ProviderRequest({
  ProviderHistoryData,
}: ProviderHistoryCardProps) {
  return (
    <ScrollArea className="mx-10 flex h-[500px] w-11/12 flex-col gap-5 rounded-md border p-5">
      {ProviderHistoryData.map((history) => (
        <div
          className="mb-5 flex w-full flex-row gap-5 rounded-lg bg-white p-4 shadow-lg"
          key={history.id}
        >
          <Image
            src={history.imageUrl}
            alt={history.customerName}
            className=" mx-0"
            width={150}
            height={150}
          />
          <div>
            <h2 className="text-lg font-semibold">{history.customerName}</h2>
            <p>
              <strong>ID:</strong> {history.id}
            </p>
            <p>
              <strong>Address:</strong> {history.address}
            </p>
            <p>
              <strong>Contact Number:</strong> {history.contactNumber}
            </p>
            <p>
              <strong>Date:</strong> {history.date}
            </p>
          </div>
          <div className="ml-72 mt-2 flex flex-col gap-2">
            <Button className="w-40">Accept</Button>
            <Button className="w-40">Decline</Button>
            <Button className="w-40">View</Button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}
