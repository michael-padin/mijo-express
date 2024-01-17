"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createReport } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ReportSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
});

type ReportType = z.infer<typeof ReportSchema>;

const defaultValues = {
  title: "",
  description: "",
};

const CreateReportForm = () => {
  const [open, setOpen] = useState(false);
  const session = useSession();
  const form = useForm<any>({
    resolver: zodResolver(ReportSchema),
    defaultValues,
  });

  const onSubmit = async (data: ReportType) => {
    const newData = {
      ...data,
      userName: session.data?.user.fullName,
      userId: session.data?.user._id,
    };
    const response = await createReport(newData);

    if (response?.status === "error") {
      toast.error(response.message);
      return;
    }
    toast.success("Report created successfully");
    form.reset(defaultValues);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Report</Button>
      </DialogTrigger>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className="space-y-3"
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new report</DialogTitle>
                <DialogDescription>
                  Fill out the form below to create a new report
                </DialogDescription>
              </DialogHeader>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Report 1" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give your report a descriptive title
                    </FormDescription>
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
                      <Textarea placeholder=" I feel bad ... " {...field} />
                    </FormControl>
                    <FormDescription>
                      Describe what happened in detail
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="lg:w-[100px]"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    "Submit"
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

export default CreateReportForm;
