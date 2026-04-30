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
import type { UpdatePersonalInfoValues, UserProfile } from "../schemas/profile.schema";
import { updatePersonalInfoSchema } from "../schemas/profile.schema";

interface PersonalInfoFormProps {
  onSubmit: (data: UpdatePersonalInfoValues) => Promise<void>;
  initialValues: UserProfile;
}

export const PersonalInfoForm = ({ onSubmit, initialValues }: PersonalInfoFormProps) => {
  const i18n = useProfileI18n();
  const form = useForm<UpdatePersonalInfoValues>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      name: initialValues.name,
      email: initialValues.email,
      phone: initialValues.phone,
    },
  });

  const handleSubmit = async (data: UpdatePersonalInfoValues) => {
    await onSubmit(data);
    form.reset(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} noValidate className="space-y-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>{i18n.personal.cardTitle}</CardTitle>
            <CardDescription>{i18n.personal.cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.personal.nameLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={i18n.personal.namePlaceholder}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{i18n.personal.nameDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.personal.emailLabel}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={i18n.personal.emailPlaceholder}
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>{i18n.personal.emailDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{i18n.personal.phoneLabel}</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="01XXXXXXXXX" disabled={form.formState.isSubmitting} {...field} />
                  </FormControl>
                  <FormDescription>{i18n.personal.phoneDescription}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={form.formState.isSubmitting}
            onClick={() =>
              form.reset({
                name: initialValues.name,
                email: initialValues.email,
                phone: initialValues.phone,
              })
            }
          >
            {i18n.buttons.reset}
          </Button>
          <Can I={AbilityAction.UPDATE} a={UserAuthZEntity}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? i18n.buttons.saving : i18n.buttons.savePersonal}
            </Button>
          </Can>
        </div>
      </form>
    </Form>
  );
};
