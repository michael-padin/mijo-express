"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Info, Loader2, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import { ServiceActionsProps } from "./types";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const ServiceReviewSchema = z.object({
  serviceProviderId: z.string(),
  serviceTitle: z.string().min(1, { message: "Title is required" }),
  serviceDescription: z.string().min(1, { message: "Description is required" }),
  serviceCategory: z.string().min(1, { message: "Category is required" }),
  servicePrice: z.number().min(1, { message: "Price is required" }),
});

type ServiceReview = z.infer<typeof ServiceReviewSchema>;

const defaultValues = {
  serviceTitle: "",
  serviceDescription: "",
  serviceCategory: "",
  servicePrice: 0,
};

export const ServiceAction = ({ id, serviceInfo }: ServiceActionsProps) => {
  const session = useSession();
  const router = useRouter();
  const form = useForm<ServiceReview>({
    resolver: zodResolver(ServiceReviewSchema),

    defaultValues: {
      ...defaultValues,
      serviceTitle: serviceInfo.serviceTitle,
      serviceDescription: serviceInfo.serviceDescription,
      serviceCategory: serviceInfo.serviceCategory,
      servicePrice: serviceInfo.servicePrice,
      serviceProviderId: serviceInfo.serviceProviderId,
    },
  });

  const onSubmit = async (data: ServiceReview) => {
    const newData = {
      ...serviceInfo,
      ...data,
      serviceCategorySlug: slugify(data.serviceCategory),
    };

    console.log(newData);

    const response = await fetch("/api/services/update", {
      method: "POST",
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      form.reset(defaultValues);
      toast.success("Service created successfully");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `/api/services/delete?serviceId=${serviceInfo._id}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      toast.success("Service deleted successfully");
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuItem onClick={handleDetailsClick}>
            <Info className="mr-2 h-4 w-4" />
            Details
          </DropdownMenuItem> */}
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Info className="mr-2 h-4 w-4" />
              Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Pen className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem onClick={handleDelete} className="text-red-600">
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
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
                <DialogTitle>Update Service</DialogTitle>
                <DialogDescription>
                  Please fill out the form below to update your service.
                </DialogDescription>
              </DialogHeader>
              <Input type="hidden" {...form.register("serviceProviderId")} />
              <FormField
                control={form.control}
                name="serviceTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Service title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Service description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="servicePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-2 top-2 text-muted-foreground">
                          ₱
                        </span>
                        <Input
                          placeholder="Service price"
                          className="pl-8"
                          {...field}
                          type="number"
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" /> <span>Updating</span>
                    </>
                  ) : (
                    "Update"
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
