"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/form/Form";
import { FormField } from "@/components/form/FormField";
import { Input } from "@/components/form/Input";
import { Textarea } from "@/components/form/Textarea";
import { Button } from "@/components/ui/button";

const bdPhoneRegex = /^01[3-9]\d{8}$/;

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  phone: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number."),
  address: z.string().trim().min(10, "Address must be at least 10 characters."),
  notes: z.string().trim().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      notes: "",
    },
  });

  const onSubmit = (values: CheckoutFormValues) => {
    console.log("Checkout payload", values);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Name" error={errors.name?.message}>
        <Input type="text" placeholder="Enter your full name" {...register("name")} />
      </FormField>

      <FormField label="Phone Number" error={errors.phone?.message}>
        <Input type="tel" placeholder="01XXXXXXXXX" inputMode="numeric" {...register("phone")} />
      </FormField>

      <FormField label="Address" error={errors.address?.message}>
        <Textarea placeholder="Building, road, area, and delivery instructions" {...register("address")} />
      </FormField>

      <FormField label="Notes" error={errors.notes?.message}>
        <Textarea placeholder="Optional notes for delivery" {...register("notes")} />
      </FormField>

      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        Place Order
      </Button>
    </Form>
  );
}
