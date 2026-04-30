"use client";

import { UserAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { UpdatePersonalInfoValues, UserProfile } from "../schemas/profile.schema";
import { updatePersonalInfoSchema } from "../schemas/profile.schema";

interface PersonalInfoFormProps {
  onSubmit: (data: UpdatePersonalInfoValues) => Promise<void>;
  initialValues: UserProfile;
}

export const PersonalInfoForm = ({ onSubmit, initialValues }: PersonalInfoFormProps) => {
  const form = useForm<UpdatePersonalInfoValues>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      name: initialValues.name,
      email: initialValues.email,
      phone: initialValues.phone,
    },
  });

  const handleSubmit = async (data: UpdatePersonalInfoValues) => {
    await onSubmit(data);
    form.reset(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your basic profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>We'll use this for important account notifications.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="01XXXXXXXXX" disabled={form.formState.isSubmitting} {...field} />
                  </FormControl>
                  <FormDescription>Use a valid Bangladesh phone number format (e.g., 01XXXXXXXXX).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() =>
              form.reset({
                name: initialValues.name,
                email: initialValues.email,
                phone: initialValues.phone,
              })
            }
          >
            Reset
          </Button>
          <Can I={AbilityAction.UPDATE} a={UserAuthZEntity}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Personal Info"}
            </Button>
          </Can>
        </div>
      </form>
    </Form>
  );
};
