"use client";
import { MeCombobox } from "@/components/me/me-combobox";
import { MeInputAddress } from "@/components/me/me-input-address";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MeDatePickerWithRange } from "@/components/me/me-date-range-picker";
import { MeSelect } from "@/components/me/me-select";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useEffect } from "react";
import { addDays } from "date-fns";

const serviceRequestSchema = z.object({
  serviceOfferId: z.string().min(1, { message: "Please select a service" }),
  serviceProviderId: z.string(),
  serviceProviderName: z.string(),
  serviceProviderEmail: z.string(),
  serviceProviderAddress: z.string(),
  serviceProviderContactNumber: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  contactNumber: z.string().optional(),
  customerAddress: z.string(),
  customerDescription: z
    .string()
    .min(4, { message: "Please describe the job you want to be done." }),
  startEndDate: z
    .object({
      from: z.date().min(new Date()),
      to: z.date().min(new Date()),
    })
    .optional(),
});

const defaultValues = {
  startEndDate: {
    from: new Date(),
    to: new Date(),
  },
  serviceOfferId: "",
  customerDescription: "",
};

type ServiceRequestValues = z.infer<typeof serviceRequestSchema>;

type ServiceRequestFormProps = {
  servicesOferrs: any;
  providerInfo: any;
  userInfo: any;
};

export default function ServiceRequestForm({
  servicesOferrs,
  providerInfo,
  userInfo,
}: ServiceRequestFormProps) {
  const form = useForm<ServiceRequestValues>({
    resolver: zodResolver(serviceRequestSchema),

    defaultValues: {
      serviceProviderId: providerInfo._id,
      serviceProviderName: providerInfo.fullName,
      serviceProviderAddress: providerInfo.address,
      serviceProviderEmail: providerInfo.address,
      serviceProviderContactNumber: providerInfo.contactNumber,
      serviceOfferId: "",
      customerName: userInfo?.fullName,
      customerId: userInfo?._id,
      customerEmail: userInfo?.email,
      contactNumber: userInfo?.contactNumber || undefined,
      customerAddress: userInfo?.address,
      customerDescription: "",
      startEndDate:
        {
          from: new Date(),
          to: addDays(new Date(), 2),
        } || {},
    },
  });

  const onSubmit = async (data: ServiceRequestValues) => {
    const response = await fetch("/api/customer/service-request", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Service request sent successfully");
      form.reset();
      return;
    }

    toast.error("Failed to send service request");
    form.reset(defaultValues);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="space-y-4">
          <Input type="hidden" {...form.register("serviceProviderId")} />
          <Input type="hidden" {...form.register("serviceProviderName")} />
          <Input type="hidden" {...form.register("serviceProviderAddress")} />
          <Input type="hidden" {...form.register("serviceProviderEmail")} />
          <Input
            type="hidden"
            {...form.register("serviceProviderContactNumber")}
          />
          <Input type="hidden" {...form.register("customerId")} />
          <Input type="hidden" {...form.register("customerName")} />
          <Input type="hidden" {...form.register("customerAddress")} />
          <Input type="hidden" {...form.register("customerDescription")} />
          <Input type="hidden" {...form.register("customerEmail")} />
          <FormField
            control={form.control}
            name="serviceOfferId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Select service</FormLabel>
                <MeSelect
                  placeholder="I want you to fix my ..."
                  listOptions={servicesOferrs.map((service: any) => ({
                    label: `₱${service.servicePrice} - ${service.serviceTitle}`,
                    value: service.serviceOfferId,
                    description: service.serviceDescription,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                  showTooltip
                />
                <FormDescription>{"You won't charge yet"}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="customerDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="I want you to fix my ..." {...field} />
                </FormControl>
                <FormDescription>
                  Describe the job you want to be done.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startEndDate"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Prefered Start and End Date</FormLabel>
                <FormControl>
                  <MeDatePickerWithRange
                    date={field?.value}
                    setDate={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  When do you want the job to be done?
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit Request
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
