/** @format */

"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Card,
  CardDescription,
  CardFooter,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Service } from "@/lib/types/userType";

export default function UserAppointment({ services }: { services: Service[] }) {
  console.log(services);

  return (
    <ScrollArea className="w-full">
      <div>
        {services?.length > 0 ? (
          services.map((getService) => (
            <Card
              className="flex h-20 w-full flex-row gap-2"
              key={getService.serviceId}
            >
              <CardHeader className="flex flex-col gap-2">
                <CardTitle>{getService.serviceName}</CardTitle>
                <CardDescription>{getService.serviceCode}</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger>More Info</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>More Details</DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                      <p>{getService.providerName}</p>
                      <p>{getService.providerAddress}</p>
                      <p>{getService.providerContactNumber}</p>
                    </div>
                    <div>
                      <p>{getService.date}</p>
                      <p>{getService.status}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <h1>No Services Available</h1>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
