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
import { Separator } from "@/components/ui/separator";
import { MeDatePickerWithRange } from "@/components/me/me-date-range-picker";
import { MeSelect } from "@/components/me/me-select";

const serviceRequestSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  contactNumber: z.string().min(1),
  address: z.string().min(10),
  category: z.string(),
  description: z.string().min(4),
  date: z.date(),
  urgency: z.string().min(2),
  budget: z.string().min(2),
  attachments: z.array(z.string().optional()).optional(),
  startEndDate: z.object({
    from: z
      .date()
      .min(new Date(), { message: "Start date must be after today" }),
    to: z
      .date()
      .min(new Date(), { message: "End date must be after start date" }),
  }),
});

const urgencyOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

type ServiceRequestValues = z.infer<typeof serviceRequestSchema>;

type ServiceRequestFormProps = {
  servicesOferrs: any;
};

export default function ServiceRequestForm({
  servicesOferrs,
}: ServiceRequestFormProps) {
  const form = useForm<ServiceRequestValues>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      fullName: "",
      email: "",
      contactNumber: "",
      address: "",
      category: "",
      description: "",
      date: new Date(),
      urgency: "",
      budget: "",
      attachments: [],
      startEndDate: {
        from: undefined,
        to: undefined,
      },
    },
  });

  function onSubmit(data: ServiceRequestValues) {
    console.log({ data });
    console.log("hello");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select service</FormLabel>
              <MeSelect
                placeholder="I want you to fix my ..."
                listOptions={[{ label: "Plumbing", value: "plumbing" }]}
                value={field.value}
                onChange={field.onChange}
              />
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Submit Request
        </Button>
      </form>
    </Form>
  );
}
