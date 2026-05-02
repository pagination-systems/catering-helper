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
import { useProfileI18n } from "@/features/admin/profile/lib/profile-i18n";
import type { UpdatePasswordValues } from "../schemas/profile.schema";
import { updatePasswordSchema } from "../schemas/profile.schema";

interface SecurityFormProps {
  onSubmit: (data: UpdatePasswordValues) => Promise<void>;
}

export const SecurityForm = ({ onSubmit }: SecurityFormProps) => {
  const i18n = useProfileI18n();
  const form = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: UpdatePasswordValues) => {
    await onSubmit(data);
    form.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>{i18n.security.cardTitle}</CardTitle>
            <CardDescription>{i18n.security.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.security.currentPasswordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={i18n.security.currentPasswordPlaceholder}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.security.newPasswordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={i18n.security.newPasswordPlaceholder}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">{i18n.security.newPasswordDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.security.confirmPasswordLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={i18n.security.confirmPasswordPlaceholder}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" disabled={form.formState.isSubmitting} onClick={() => form.reset()}>
            {i18n.buttons.reset}
          </Button>
          <Can I={AbilityAction.UPDATE} a={UserAuthZEntity}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? i18n.buttons.saving : i18n.buttons.saveSecurity}
            </Button>
          </Can>
        </div>
      </form>
    </Form>
  );
};
