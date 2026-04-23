"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function OrderSuccess() {
  return (
    <main className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-10 right-[-100px] h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[68vh] w-full max-w-[860px] items-center px-4 py-10 sm:px-6 lg:px-8">
        <Card className="w-full border-border/70 bg-card/95 shadow-[0_24px_64px_-40px_hsl(var(--foreground)/0.45)] backdrop-blur-sm">
          <CardHeader className="px-6 pt-8 pb-2 text-center sm:px-8">
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/20">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/20" />
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
              </div>
            </div>

            <CardTitle className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Order Confirmed
            </CardTitle>
            <CardDescription className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Your order was placed successfully. Head to your profile page to view status updates and manage upcoming
              meals.
            </CardDescription>
          </CardHeader>

          <div className="mx-auto max-w-4xl px-6 pb-8 sm:px-8">
            <Button asChild className="h-11 w-full text-sm sm:text-base">
              <Link href="/orders" className="inline-flex items-center justify-center gap-2 font-semibold">
                Go to Orders
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
