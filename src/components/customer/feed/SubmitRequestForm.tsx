"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { CheckIcon, MapPin, Phone } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProviderInfo } from "./ProviderCard";
import { toast } from "sonner";

type SubmitRequestFormProps = {
  providerInfo: ProviderInfo;
};

const FormSchema = z.object({
  category: z.string().min(1),
  customerId: z.string().min(1),
  serviceProviderId: z.string().min(1),
});

type FormData = z.infer<typeof FormSchema>;

export default function SubmitRequestForm({
  providerInfo,
}: SubmitRequestFormProps) {
  const { ServiceCategory, fullName, profile } = providerInfo;
  const session = useSession();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      customerId: session.data?.user._id,
      serviceProviderId: providerInfo._id,
    },
  });

  const serviceCategoryOptions = ServiceCategory.map((category) => ({
    label: category,
    value: category,
  }));

  const onSubmit = async (data: FormData) => {
    const response = await fetch("/api/customer/feed", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    toast.success("Request submitted successfully");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting}>
          <DialogHeader>
            <div className="">
              <div className="mt-4 flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={profile.profileImg} alt="@shadcn" />
                  <AvatarFallback>
                    {fullName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="">
                  <h1>{fullName}</h1>
                  <div className="inline-flex items-center gap-1 text-sm">
                    <StarFilledIcon className="text-yellow-400" />
                    <span className="font-semibold">5.0</span>
                    <span>(400)</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogHeader>
          <div className="flex flex-col gap-5">
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="">
                <span className="text-xs text-muted-foreground">
                  Description
                </span>
                <p className="text-sm ">{profile.description}</p>
              </div>
              {/* <p className="text-sm font-semibold">{price.toString()}</p> */}
              <div>
                <div className="flex items-center gap-2">
                  <MapPin size={15} />
                  <p className="text-sm ">{profile.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={15} />
                  <p className="text-sm ">{profile.contactNumber}</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col ">
              <span className="text-xs text-muted-foreground">
                Availability
              </span>
              <div className="flex flex-col ">
                {providerInfo.availability.map((availability, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm ">
                    <p>{availability.dayOfWeek}</p>
                    <p>
                      {availability.startTime} - {availability.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Services Offer</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? serviceCategoryOptions.find(
                                  (category) => category.value === field.value
                                )?.label
                              : "Select service"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          {serviceCategoryOptions.length > 5 && (
                            <CommandInput
                              placeholder="Search service..."
                              className="h-9"
                            />
                          )}
                          <CommandEmpty>No service found</CommandEmpty>
                          <CommandGroup>
                            {serviceCategoryOptions.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => {
                                  form.setValue("category", category.value);
                                }}
                              >
                                {category.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    category.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select the service you want to request
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit request</Button>
          </DialogFooter>
        </fieldset>
      </form>
    </Form>
  );
}
