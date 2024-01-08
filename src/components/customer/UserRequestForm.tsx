// THIS FORM FETCHCES USER INFO AND SUBMITS ADDITIONAL INFO FOR IT TO DISPLAYED IN THE
// JOB FEED IN THE PROVIDERS PAGE

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { toast } from "@/components/ui/use-toast";

// THIS SHOULD BE FETCHED IN THE REGISTERED SERVICE CATEGORIES ADDED BY THE ADMIN

const items = [
  {
    value: "house-cleaning",
    label: "House Cleaning",
  },
  {
    value: "plumbing",
    label: "Plumbing Services",
  },
  {
    value: "electrician",
    label: "Electrician Services",
  },
  {
    value: "pest",
    label: "Pest Control",
  },
  {
    value: "appliance",
    label: "Appliance Repair",
  },
  {
    value: "landscaping",
    label: "Landscaping/Gardening",
  },
  {
    value: "hvac",
    label: "HVAC Services",
  },
  {
    value: "security",
    label: "Home Security Systems",
  },
  {
    value: "interior",
    label: "Interior Design/Decorating",
  },
  {
    value: "moving",
    label: "Moving Services",
  },
];

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const FormSchema = z.object({
  type: z.enum(
    [
      "house-cleaning",
      "plumbing",
      "electrician",
      "pest",
      "appliance",
      "landscaping",
      "hvac",
      "security",
      "interior",
      "moving",
    ],
    {
      required_error: "There's no services selected.",
    }
  ),
});

export default function UserRequestForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-md font-poppins">
                Services Offered:
              </FormLabel>
              <FormDescription>
                Select the service that you need.
              </FormDescription>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  {items.map((option) => (
                    <FormItem
                      key={option.value}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="font-poppins font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
