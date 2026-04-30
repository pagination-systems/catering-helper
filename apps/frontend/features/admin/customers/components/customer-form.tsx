import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCustomersI18n } from "../lib/customers-i18n";
import { type CreateCustomerValues, createCustomerSchema } from "../schemas/customer.schema";

interface CustomerFormProps {
  onSubmit: (data: CreateCustomerValues) => void;
  initialValues?: CreateCustomerValues;
  submitLabel?: string;
}

const getDefaultValues = (initialValues?: CreateCustomerValues): CreateCustomerValues => ({
  name: initialValues?.name ?? "",
  phone: initialValues?.phone ?? "",
});

export const CustomerForm = ({ onSubmit, initialValues, submitLabel }: CustomerFormProps) => {
  const i18n = useCustomersI18n();
  const resolvedSubmitLabel = submitLabel ?? i18n.form.createCustomer;
  const form = useForm<CreateCustomerValues>({
    resolver: zodResolver(createCustomerSchema(i18n.form.validation)),
    defaultValues: getDefaultValues(initialValues),
  });

  useEffect(() => {
    form.reset(getDefaultValues(initialValues));
  }, [form, initialValues]);

  const handleSubmit = (data: CreateCustomerValues) => {
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
                <FormLabel>{i18n.form.nameLabel}</FormLabel>
                <FormControl>
                  <Input type="text" placeholder={i18n.form.namePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.form.phoneLabel}</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder={i18n.form.phonePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-auto flex justify-end border-t pt-4">
          <Button type="submit">{resolvedSubmitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};
