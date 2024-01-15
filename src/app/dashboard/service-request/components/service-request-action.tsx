"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { DotsHorizontalIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Ban, Info, Loader2, Pencil, Star, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ServiceRequestActionProps,
  ServiceReview,
  ServiceReviewSchema,
} from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultValues = {
  customerComment: "",
  customerRating: 5,
};

export const ServiceRequestAction = ({
  id,
  requestInfo,
}: ServiceRequestActionProps) => {
  const session = useSession();
  const router = useRouter();

  const { profileImg } = session.data?.user || {};
  const {
    customerName,
    customerId,
    customerAddress,
    serviceProviderId,
    requestId,
    isReviewed,
    isCustomerReviewed,
    status,
    serviceProviderName,
  } = requestInfo;

  const form = useForm<ServiceReview>({
    resolver: zodResolver(ServiceReviewSchema),

    defaultValues: {
      serviceRequestId: requestId,
      providerId: serviceProviderId,
      customerId: customerId,
      customerName: customerName,
      customerProfileImg: profileImg,
      customerAddress: customerAddress,
      customerComment: "",
      customerRating: 5,
    },
  });

  const handleCancel = async () => {
    const response = await fetch(
      `/api/service-request/cancel?requestId=${requestInfo.requestId}`
    );

    if (response.status === 200) {
      router.refresh();
      toast.success("Service Cancelled Successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDetailsClick = () =>
    router.push(`service-request/details/${requestInfo.requestId}`);

  const onSubmit = async (data: ServiceReview) => {
    const respones = await fetch(`/api/service-request/review`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (respones.status === 200) {
      toast.success("Review submitted successfully");
      form.reset(defaultValues);
      router.refresh();
      return;
    }

    form.reset(defaultValues);
    router.refresh();
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleDetailsClick}>
            <Info className="mr-2 h-4 w-4" />
            Details
          </DropdownMenuItem>
          <DialogTrigger asChild>
            {!isCustomerReviewed && status === "completed" && (
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Review
              </DropdownMenuItem>
            )}
          </DialogTrigger>
          {["pending", "accepted"].includes(status) && (
            <DropdownMenuItem onClick={handleCancel} className="text-red-600">
              <Ban className="mr-2 h-4 w-4" />
              Cancel
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="space-y-3"
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Service Review</DialogTitle>
                <DialogDescription>
                  Rate you experience from{" "}
                  <span className="font-bold">{serviceProviderName}</span>
                </DialogDescription>
              </DialogHeader>
              <Input type="hidden" {...form.register("providerId")} />
              <Input type="hidden" {...form.register("customerId")} />
              <Input type="hidden" {...form.register("customerName")} />
              <Input type="hidden" {...form.register("customerProfileImg")} />
              <Input type="hidden" {...form.register("customerAddress")} />
              <FormField
                control={form.control}
                name="customerRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Your rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">
                          <div className="flex items-center gap-5">
                            <p>1.0</p>
                            <div className="flex gap-2">
                              <StarFilledIcon color="gold" />
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="2">
                          <div className="flex items-center gap-5">
                            <p>2.0</p>
                            <div className="flex gap-2">
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="3">
                          <div className="flex items-center gap-5">
                            <p>3.0</p>
                            <div className="flex gap-2">
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="4">
                          <div className="flex items-center gap-5">
                            <p>4.0</p>
                            <div className="flex gap-2">
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="5">
                          <div className="flex items-center gap-5">
                            <p>5.0</p>
                            <div className="flex gap-2">
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                              <StarFilledIcon color="gold" />
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerComment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your comment of his service"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Submit review"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </fieldset>
        </form>
      </Form>
    </Dialog>
  );
};
