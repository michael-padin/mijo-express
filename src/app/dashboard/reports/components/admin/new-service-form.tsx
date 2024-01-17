"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const NewServiceForm = () => {
  const router = useRouter();
  const session = useSession();
  const form = useForm<ServiceReview>({
    resolver: zodResolver(ServiceReviewSchema),

    defaultValues: {
      ...defaultValues,
      serviceProviderId: session.data?.user?._id || "",
    },
  });

  const onSubmit = async (data: ServiceReview) => {
    const newData = {
      ...data,
      serviceCategorySlug: slugify(data.serviceCategory),
    };

    const response = await fetch("/api/services/create", {
      method: "POST",
      body: JSON.stringify(newData),
    });

    if (response.ok) {
      form.reset(defaultValues);
      toast.success("Service created successfully");
      router.refresh();
    } else {
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new service</Button>
      </DialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="space-y-3"
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new service</DialogTitle>
                <DialogDescription>
                  Please fill out the form below to create a new service.
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
                      <Loader2 className="animate-spin" /> <span>Creating</span>
                    </>
                  ) : (
                    "Create"
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

export default NewServiceForm;
