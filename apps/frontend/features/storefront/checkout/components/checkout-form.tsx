"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MapPin, MessageSquare, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const bdPhoneRegex = /^01[3-9]\d{8}$/;

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  phone: z.string().trim().regex(bdPhoneRegex, "Enter a valid Bangladesh phone number."),
  address: z.string().trim().min(10, "Address must be at least 10 characters."),
  notes: z.string().trim().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm({ tenant }: { tenant: string }) {
  const router = useRouter();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", address: "", notes: "" },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    console.log("Checkout payload", values);
    router.push(`/${tenant}/order-success`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                Full Name
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="e.g. Rahim Uddin" {...field} />
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
              <FormLabel className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input type="tel" placeholder="01XXXXXXXXX" inputMode="numeric" {...field} />
              </FormControl>
              <FormDescription className="text-xs">Bangladesh number — starts with 013–019</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                Delivery Address
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Building, road, area, and any delivery instructions"
                  className="min-h-[80px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-muted-foreground" />
                Notes
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Allergies, preferences, or any other notes"
                  className="min-h-[64px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-11 w-full font-semibold" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Placing Order…
            </>
          ) : (
            "Place Order"
          )}
        </Button>
      </form>
    </Form>
  );
}
