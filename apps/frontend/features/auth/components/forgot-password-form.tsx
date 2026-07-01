"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAdminContent } from "@/lib/admin-i18n";
import { useLanguage } from "@/providers/language-provider";
import { type ForgotPasswordValues, forgotPasswordSchema } from "../schemas/forgot-password.schema";

function BackToLogin({ label }: { label: string }) {
  return (
    <Link
      href="/admin/login"
      className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function ForgotPasswordForm() {
  const { language } = useLanguage();
  const t = getAdminContent(language).forgotPassword;
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // UI only — backend integration is intentionally not wired up yet.
  const onSubmit = (values: ForgotPasswordValues) => {
    setSubmittedEmail(values.email);
  };

  if (submittedEmail) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="h-6 w-6" />
        </div>
        <div className="space-y-1.5">
          <h2 className="text-lg font-semibold text-foreground">{t.successTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {t.successSubtitle.replace("{email}", submittedEmail)}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setSubmittedEmail(null);
            form.reset();
          }}
        >
          {t.resend}
        </Button>
        <div className="flex justify-center">
          <BackToLogin label={t.backToLogin} />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.emailLabel}</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" placeholder={t.emailPlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t.submit}
        </Button>

        <div className="flex justify-center">
          <BackToLogin label={t.backToLogin} />
        </div>
      </form>
    </Form>
  );
}
