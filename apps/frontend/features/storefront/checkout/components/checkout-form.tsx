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
        {/* Contact info */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="text" placeholder="e.g. Rahim Uddin" className="pl-9" {...field} />
                </div>
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input type="tel" placeholder="01XXXXXXXXX" inputMode="numeric" className="pl-9" {...field} />
                </div>
              </FormControl>
              <FormDescription className="text-xs">Bangladesh number — starts with 013–019</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Divider */}
        <div className="border-t border-border/40" />

        {/* Delivery details */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    placeholder="Building, road, area, and any delivery instructions"
                    className="min-h-[80px] resize-none pl-9"
                    {...field}
                  />
                </div>
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
              <FormLabel>
                Notes{" "}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">(optional)</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    placeholder="Allergies, preferences, or any other notes"
                    className="min-h-[64px] resize-none pl-9"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="h-11 w-full rounded-xl text-base font-semibold" disabled={form.formState.isSubmitting}>
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
