import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { createUserSchema, CreateUserValues, UserRole } from "../schemas/user.schema";

interface UserFormProps {
  onSubmit: (data: CreateUserValues) => void;
  initialValues?: CreateUserValues;
  submitLabel?: string;
}

const roleOptions: SelectOption<UserRole>[] = Object.values(UserRole).map((role) => ({
  value: role,
  label: role,
}));

const getDefaultValues = (initialValues?: CreateUserValues): CreateUserValues => ({
  name: initialValues?.name ?? "",
  email: initialValues?.email ?? "",
  role: initialValues?.role ?? UserRole.Manager,
});

export const UserForm = ({ onSubmit, initialValues, submitLabel = "Create User" }: UserFormProps) => {
  const form = useForm<CreateUserValues>({
    resolver: zodResolver(createUserSchema),
    defaultValues: getDefaultValues(initialValues),
  });

  useEffect(() => {
    form.reset(getDefaultValues(initialValues));
  }, [form, initialValues]);

  const handleSubmit = (data: CreateUserValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form className="flex h-full flex-col pt-2" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter full name" {...field} />
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
                  <Input type="email" placeholder="name@company.com" {...field} />
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
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    name={field.name}
                    options={roleOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-auto flex justify-end border-t pt-4">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};
