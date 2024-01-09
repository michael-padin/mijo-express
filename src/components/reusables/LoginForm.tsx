"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
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
    <div className="h-full max-w-5xl p-10">
      <h1 className="font-poppins mb-5 text-6xl">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-96 space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-poppins">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bottom-1 w-full rounded-none border-b-gray-600 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-poppins">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bottom-1 w-full rounded-none border-b-gray-600 focus:outline-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="font-poppins w-full bg-yellow-500" type="submit">
            Sign In
          </Button>
        </form>
        <div className="ml-32 mt-10 flex w-full items-center gap-2">
          <p className=" cursor-pointer select-none hover:text-blue-500 hover:underline">
            Register
          </p>
          <Separator orientation="vertical" className="h-5" />
          <p className=" cursor-pointer select-none hover:text-blue-500 hover:underline">
            Login
          </p>
        </div>
      </Form>
    </div>
  );
}
