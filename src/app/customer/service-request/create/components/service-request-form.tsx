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
    from: z.date(),
    to: z.date(),
  }),
});

const urgencyOptions = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
];

type ServiceRequestValues = z.infer<typeof serviceRequestSchema>;

type ServiceRequestFormProps = {
  categories: {
    _id: string;
    name: string;
    slug: string;
  }[];
};

export default function ServiceRequestForm({
  categories,
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
        from: new Date(),
        to: new Date(),
      },
    },
  });

  function onSubmit(data: ServiceRequestValues) {
    console.log({ data });
    console.log("hello");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormDescription>
                What is your full name? This will be used to identify you.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="yourname@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  What is your email address? We will use this to contact you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="+639" type="tel" {...field} />
                </FormControl>
                <FormDescription>
                  What is your phone number? We will use this to contact you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <MeInputAddress value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>
                Where do you want the job to be done?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
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
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Category</FormLabel>
                <MeCombobox
                  listOptions={categories?.map((category) => ({
                    label: category.name,
                    value: category._id,
                  }))}
                  onChange={field.onChange}
                  placeholder="Select Category"
                  value={field.value}
                />
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="urgency"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Urgency</FormLabel>
                <MeCombobox
                  listOptions={urgencyOptions}
                  onChange={field.onChange}
                  placeholder="Select Urgency"
                  value={field.value}
                />
                <FormDescription>How urgent is this job?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget ₱</FormLabel>
              <FormControl>
                <Input placeholder="0.00" {...field} />
              </FormControl>
              <FormDescription>
                How much are you willing to pay for this job?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit Request</Button>
      </form>
    </Form>
  );
}
