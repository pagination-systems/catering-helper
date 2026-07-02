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
import { toast } from "@/lib/toast";
import { formatDateValue } from "@/lib/utils";
import { useLanguage } from "@/providers/language-provider";
import { placeOrder } from "../../api/order.api";
import type { DayName } from "../../data";
import { useOrderSummaryData } from "../../order-summary-data";

const DELIVERY_FEE = 60;
const daysByJsIndex: DayName[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Earliest upcoming date (within a week) whose weekday is present in the cart. */
const resolveDeliveryDate = (selectedDays: Set<DayName>): Date => {
  const today = new Date();
  for (let offset = 0; offset < 7; offset += 1) {
    const candidate = new Date(today);
    candidate.setDate(today.getDate() + offset);
    if (selectedDays.has(daysByJsIndex[candidate.getDay()])) return candidate;
  }
  return today;
};

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
  const { language } = useLanguage();
  const { orderRows } = useOrderSummaryData(language);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", phone: "", address: "", notes: "" },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (orderRows.length === 0) {
      toast.error("Your cart is empty. Please add meals before placing an order.");
      return;
    }

    const deliveryDate = resolveDeliveryDate(new Set(orderRows.map((row) => row.day)));

    try {
      await placeOrder(tenant, {
        customerName: values.name,
        customerPhone: values.phone,
        deliveryAddress: values.address,
        notes: values.notes ?? "",
        packageName: orderRows[0].packageName,
        deliveryDate: formatDateValue(deliveryDate),
        deliveryFee: DELIVERY_FEE,
        items: orderRows.map((row) => ({
          packageId: row.pkgId,
          variantName: row.label,
          quantity: row.quantity,
          items: row.items,
        })),
      });

      router.push(`/${tenant}/order-success`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to place order. Please try again.";
      toast.error(message);
    }
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
                Notes <span className="ml-1 text-[10px] font-normal text-muted-foreground">(optional)</span>
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

        <Button
          type="submit"
          className="h-11 w-full rounded-xl text-base font-semibold"
          disabled={form.formState.isSubmitting}
        >
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
