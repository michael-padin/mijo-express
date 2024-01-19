"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader2, Pen, Trash } from "lucide-react";
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
  FormDescription,
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

import { z } from "zod";
import { deleteReport, updateReport } from "@/lib/actions/report";
import { useState } from "react";

const FormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
});

type FormData = z.infer<typeof FormSchema>;

const defaultValues = {
  title: "",
  description: "",
};

type ReportActionsProps = { reportInfo: any };

export const ReportActions = ({ reportInfo }: ReportActionsProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...defaultValues,
      title: reportInfo.title,
      description: reportInfo.description,
    },
  });

  const onSubmit = async (data: FormData) => {
    const response = await updateReport(reportInfo._id, data);
    if (response?.status === "error") {
      toast.error(response.message);
      return;
    }
    toast.success("Report updated successfully");
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await deleteReport(reportInfo._id);

    if (response?.status === "error") {
      toast.error(response.message);
      return;
    }
    toast.success("Report deleted successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <DotsHorizontalIcon className="h-5 w-5" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
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
                  className=""
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                    </>
                  ) : (
                    "Update Report"
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
