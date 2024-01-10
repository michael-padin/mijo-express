"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import React from "react";
import { Loader2Icon } from "lucide-react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { MeInputAddress } from "@/components/me/me-input-address";
import { Separator } from "@/components/ui/separator";
import { RegisterData, RegisterSchema } from "../data/schema";

//THIS SHOULD BE FETCH FROM ADMIN

export async function getSkill() {
  try {
    const res = await fetch("/api/skills");
    return await res.json();
  } catch (error) {
    console.log("Failed");
  }
}

const skills = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterData) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    toast.success("Account created successfully");
    router.push("/login");
  };

  const [selectedRole, setSelectedRole] = useState("provider");

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
    // Additional logic based on the selected role can be added here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={form.formState.isSubmitting} className="space-y-3">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <MeInputAddress
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input placeholder="09*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Type</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setSelectedRole(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Set Role Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="provider">Provider</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedRole === "provider" && (
            <>
              <Separator />
              <FormField
                control={form.control}
                name="skills"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">Skills</FormLabel>
                      <FormDescription>
                        Select the skills you that you have.
                      </FormDescription>
                    </div>
                    {skills.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="skills"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
            </>
          )}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default RegisterForm;
