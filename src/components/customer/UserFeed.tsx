"use client";

type feed = {
  id: number;
  name: string;
  contactNumber: string;
  address: string;
  skillSet: string[];
};

interface ProviderFeedProps {
  feedArray: feed[];
}

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import UserRequest from "@/components/User/UserRequest";
import UserRequestForm from "@/components/User/UserRequestForm";

export default function UserFeed({ feedArray }: ProviderFeedProps) {
  return (
    <div className="h-[calc(100vh - 128px)]">
      <ScrollArea className="mx-10 h-[500px] w-11/12 rounded-md border">
        <div className="mt-10 flex flex-row items-center justify-around">
          <h1 className="font-poppins text-5xl">Providers You may Find</h1>
          <UserRequest />
        </div>
        <div className="flex w-full flex-wrap p-4">
          {feedArray.length === 0 ? (
            <p>No Data Available</p>
          ) : (
            feedArray.map((feedPro) => (
              <div
                key={feedPro.id}
                className="mb-8 w-1/2 border-solid border-yellow-500 px-4 md:w-1/3 lg:w-1/4 "
              >
                <div className="rounded-lg bg-white p-6 shadow-lg ">
                  <p className="mb-2 text-lg font-semibold">{feedPro.name}</p>
                  <p className="text-gray-600">{feedPro.address}</p>
                  <p className="mb-5 text-gray-600">{feedPro.contactNumber}</p>
                  <Separator />
                  {feedPro.skillSet.map((eachSkill, index) => {
                    return <p key={index}>{eachSkill}</p>;
                  })}
                  <Dialog>
                    <Button asChild className="mt-4 w-full">
                      <DialogTrigger>Assign A Job</DialogTrigger>
                    </Button>
                    <DialogContent>
                      <Card className="mt-4">
                        <CardHeader>
                          <CardTitle>Provide Job Details</CardTitle>
                          <CardDescription>
                            Input necessary data
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <UserRequestForm />
                        </CardContent>
                      </Card>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
