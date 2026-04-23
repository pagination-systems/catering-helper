'use client';

import { CheckoutForm } from './checkout-form';
import { OrderSummary } from '@/features/client-portal/components/OrderSummary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Checkout = () => {
  return (
    <main className="bg-background">
      <div className="mx-auto w-full max-w-[1260px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section>
            <Card className="border-border/70 shadow-sm dark:bg-card">
              <CardHeader>
                <CardTitle className="text-3xl font-semibold tracking-tight">Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <CheckoutForm />
              </CardContent>
            </Card>
          </section>

          <aside className="h-fit lg:sticky lg:top-6">
            <OrderSummary readonly showDeliveryFee />
          </aside>
        </div>
      </div>
    </main>
  );
};
