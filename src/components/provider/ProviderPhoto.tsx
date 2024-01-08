"use client";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UserPhoto() {
  return (
    <div className="mx-10 my-5 flex h-40 w-11/12 flex-row items-center justify-between rounded-lg shadow-xl ">
      <div className="flex flex-row items-center justify-center gap-2">
        <Avatar className="m-5 h-24 w-24 rounded-full">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="font-poppins text-xl">Upload a New Photo</h2>
      </div>
      <Dialog>
        <DialogTrigger className="m-5 h-10 w-32 rounded-lg border-2 bg-white text-black hover:border-blue-950  hover:bg-blue-950 hover:text-white ">
          Update
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload New Profile Picture</DialogTitle>
          </DialogHeader>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="font-poppins m-2" htmlFor="picture">
              Picture
            </Label>

            <Input
              className="w-[450px] cursor-pointer"
              id="picture"
              type="file"
            />
            <Button className="m-5 ml-72  w-40 self-end rounded-lg border-2 border-blue-950 bg-blue-950 text-white  hover:scale-110 hover:bg-white hover:text-black ">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
