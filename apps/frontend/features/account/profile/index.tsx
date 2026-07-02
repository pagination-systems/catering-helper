"use client";

import { ACCOUNT_TYPE_ENUMS } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck, MailWarning } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePassword, useUpdateProfile } from "@/features/auth/hooks/useAuth";
import { useAuthStore } from "@/features/auth/store/useStore";
import { useAccountI18n } from "../lib/account-i18n";
import {
  type ChangePasswordValues,
  changePasswordSchema,
  type PersonalInfoValues,
  personalInfoSchema,
} from "../schemas/profile.schema";

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

export const CustomerProfile = () => {
  const i18n = useAccountI18n().profile;
  const user = useAuthStore((s) => s.user);
  const { updateProfile, isSaving } = useUpdateProfile();
  const { changePassword, isSaving: isChangingPassword } = useChangePassword();

  const personalForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" },
  });

  const passwordForm = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    personalForm.reset({ firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" });
  }, [user?.firstName, user?.lastName, personalForm]);

  if (!user) return null;

  const displayName =
    user.fullName?.trim() || [user.firstName, user.lastName].filter(Boolean).join(" ").trim() || user.email;
  const isVerified = user.emailVerificationStatus === "verified";
  const accountTypeLabel =
    user.type === ACCOUNT_TYPE_ENUMS.ADMIN
      ? i18n.accountTypes.admin
      : user.type === ACCOUNT_TYPE_ENUMS.CATERER
        ? i18n.accountTypes.caterer
        : i18n.accountTypes.customer;

  const onPersonalSubmit = (values: PersonalInfoValues) => updateProfile(values).catch(() => {});

  const onPasswordSubmit = (values: ChangePasswordValues) =>
    changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword })
      .then(() => passwordForm.reset({ currentPassword: "", newPassword: "", confirmPassword: "" }))
      .catch(() => {});

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{i18n.title}</h1>
        <p className="text-sm text-muted-foreground">{i18n.description}</p>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{i18n.overview.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
              {getInitials(displayName)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">{displayName}</p>
              <p className="truncate text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              {i18n.overview.accountType}: {accountTypeLabel}
            </Badge>
            {isVerified ? (
              <Badge className="gap-1 bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
                <MailCheck className="h-3.5 w-3.5" />
                {i18n.overview.emailVerified}
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-amber-600 dark:text-amber-400">
                <MailWarning className="h-3.5 w-3.5" />
                {i18n.overview.emailUnverified}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Personal information */}
      <Form {...personalForm}>
        <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} noValidate>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>{i18n.personal.cardTitle}</CardTitle>
              <CardDescription>{i18n.personal.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={personalForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.personal.firstNameLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={i18n.personal.firstNamePlaceholder} disabled={isSaving} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={personalForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.personal.lastNameLabel}</FormLabel>
                      <FormControl>
                        <Input placeholder={i18n.personal.lastNamePlaceholder} disabled={isSaving} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label>{i18n.personal.emailLabel}</Label>
                <Input value={user.email} disabled readOnly />
                <p className="text-[0.8rem] text-muted-foreground">{i18n.personal.emailNote}</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => personalForm.reset({ firstName: user.firstName ?? "", lastName: user.lastName ?? "" })}
            >
              {i18n.personal.reset}
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? i18n.personal.saving : i18n.personal.save}
            </Button>
          </div>
        </form>
      </Form>

      {/* Password */}
      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} noValidate>
          <Card>
            <CardHeader className="border-b">
              <CardTitle>{i18n.security.cardTitle}</CardTitle>
              <CardDescription>{i18n.security.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.security.currentPasswordLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder={i18n.security.passwordPlaceholder}
                        disabled={isChangingPassword}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.security.newPasswordLabel}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          placeholder={i18n.security.passwordPlaceholder}
                          disabled={isChangingPassword}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.security.confirmPasswordLabel}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          placeholder={i18n.security.passwordPlaceholder}
                          disabled={isChangingPassword}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={isChangingPassword}>
              {isChangingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isChangingPassword ? i18n.security.saving : i18n.security.save}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
