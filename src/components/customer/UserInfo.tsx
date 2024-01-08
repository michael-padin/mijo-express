"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProviderInfo() {
  return (
    <div className="mx-10 h-5/6 w-11/12">
      <ScrollArea className="h-[320px] w-full rounded-md border p-8">
        <hr />
        <h1 className="font-poppins my-5 text-4xl font-medium">
          Change User Information
        </h1>
        <h2 className="font-poppins my-5 text-xl font-medium">
          Personal Information
        </h2>
        <div className="gric-cols-2 font-poppins grid gap-x-5 gap-y-5">
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="firstName">First Name</Label>
            <Input type="text" id="name" placeholder="Name" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="lastName">Last Name</Label>
            <Input type="text" id="name" placeholder="Name" />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="phone">Phone Number</Label>
            <Input type="text" id="phone" placeholder="Phone Number" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="address">Address</Label>
            <Input type="text" id="address" placeholder="Address" />
          </div>
          <h2 className="font-poppins my-5 text-xl font-medium">
            Account Information
          </h2>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Change Password</Label>
            <Input type="text" id="password" placeholder="Password" />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="confirmpassword">Confirm Password</Label>
            <Input
              type="text"
              id="confirmpassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <Button className="mt-5 w-full">Save Updated Information</Button>
      </ScrollArea>
    </div>
  );
}
