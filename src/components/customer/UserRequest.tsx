"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserRequestForm from "@/components/User/UserRequestForm";

export default function DialogCloseButton() {
  return (
    <Dialog>
      <hr />
      <DialogTrigger asChild>
        <Button className="w-40 bg-yellow-500">Request for a Service</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-lg font-poppins">
            Request for a Service
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <UserRequestForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
