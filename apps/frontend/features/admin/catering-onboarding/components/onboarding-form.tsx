"use client";

import { TENANT_STATUS_ENUMS } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { type KeyboardEvent, type ReactNode, useMemo, useRef, useState } from "react";
import { type Path, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, type SelectOption } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cateringAreas } from "@/features/caterings/data";
import { useOnboardCaterer } from "../hooks/useOnboardCaterer";
import { useOnboardingI18n } from "../lib/onboarding-i18n";
import {
  type OnboardCatererInput,
  type OnboardCatererValues,
  onboardCatererSchema,
} from "../schemas/onboarding.schema";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getDefaultValues = (): OnboardCatererInput => ({
  owner: { firstName: "", lastName: "", email: "", password: "" },
  name: "",
  slug: "",
  headline: "",
  description: "",
  status: TENANT_STATUS_ENUMS.ACTIVE,
  phone: "",
  coverImageUrl: "",
  location: "",
  area: "",
  cuisines: [],
  startingPrice: 0,
  minimumOrder: 0,
  deliveryFee: 0,
  popular: false,
  logoUrl: "",
  menuUrl: "",
  contactEmail: "",
  contactPhone: "",
  contactWhatsapp: "",
  contactAddress: "",
  socialFacebookUrl: "",
  socialInstagramUrl: "",
  socialYoutubeUrl: "",
});

const Section = ({ title, hint, children }: { title: string; hint: string; children: ReactNode }) => (
  <div className="space-y-4 border-t border-border pt-6 first:border-t-0 first:pt-0">
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="text-xs text-muted-foreground">{hint}</p>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">{children}</div>
  </div>
);

export const OnboardingForm = () => {
  const i18n = useOnboardingI18n();
  const { onboardCaterer, isSubmitting } = useOnboardCaterer();

  // Three generics: raw field type (input), context, and the transformed type
  // that `handleSubmit` yields after zod coercion/defaults.
  const form = useForm<OnboardCatererInput, unknown, OnboardCatererValues>({
    resolver: zodResolver(onboardCatererSchema),
    defaultValues: getDefaultValues(),
  });

  // Track whether the user manually edited the slug so we stop auto-suggesting.
  const slugEdited = useRef(false);
  const [cuisineInput, setCuisineInput] = useState("");

  const statusOptions: SelectOption[] = useMemo(
    () => Object.values(TENANT_STATUS_ENUMS).map((value) => ({ label: i18n.statusLabels[value], value })),
    [i18n.statusLabels],
  );

  const cuisines = form.watch("cuisines") ?? [];

  const addCuisine = () => {
    const value = cuisineInput.trim();
    if (!value) return;
    const next = Array.from(new Set([...cuisines, value]));
    form.setValue("cuisines", next, { shouldValidate: true, shouldDirty: true });
    setCuisineInput("");
  };

  const removeCuisine = (value: string) => {
    form.setValue(
      "cuisines",
      cuisines.filter((item) => item !== value),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const onCuisineKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCuisine();
    }
  };

  const onSubmit = (values: OnboardCatererValues) => {
    onboardCaterer(values, () => {
      form.reset(getDefaultValues());
      slugEdited.current = false;
      setCuisineInput("");
    });
  };

  // Reusable text/number field. Only used for string/number paths, so the
  // field value is narrowed away from the full union (boolean / string[]).
  const textField = (name: Path<OnboardCatererInput>, t: { label: string; placeholder: string }, type = "text") => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t.label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              inputMode={type === "number" ? "numeric" : undefined}
              placeholder={t.placeholder}
              {...field}
              value={field.value as string | number | undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Section title={i18n.sections.account} hint={i18n.sections.accountHint}>
          {textField("owner.firstName", i18n.fields.ownerFirstName)}
          {textField("owner.lastName", i18n.fields.ownerLastName)}
          {textField("owner.email", i18n.fields.ownerEmail, "email")}
          {textField("owner.password", i18n.fields.ownerPassword, "password")}
        </Section>

        <Section title={i18n.sections.profile} hint={i18n.sections.profileHint}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.fields.name.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.fields.name.placeholder}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);
                      if (!slugEdited.current) {
                        form.setValue("slug", slugify(event.target.value), { shouldValidate: true });
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.fields.slug.label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={i18n.fields.slug.placeholder}
                    {...field}
                    onChange={(event) => {
                      slugEdited.current = true;
                      field.onChange(event);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.fields.status.label}</FormLabel>
                <FormControl>
                  <Select
                    options={statusOptions}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={i18n.fields.status.placeholder}
                    isSearchable={false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {textField("phone", i18n.fields.phone, "tel")}
          {textField("headline", i18n.fields.headline)}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{i18n.fields.description.label}</FormLabel>
                <FormControl>
                  <Textarea rows={3} placeholder={i18n.fields.description.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Section>

        <Section title={i18n.sections.discovery} hint={i18n.sections.discoveryHint}>
          {textField("coverImageUrl", i18n.fields.coverImageUrl)}
          {textField("location", i18n.fields.location)}
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{i18n.fields.area.label}</FormLabel>
                <FormControl>
                  <Select
                    options={cateringAreas}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={i18n.areaPlaceholder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {textField("startingPrice", i18n.fields.startingPrice, "number")}
          {textField("minimumOrder", i18n.fields.minimumOrder, "number")}
          {textField("deliveryFee", i18n.fields.deliveryFee, "number")}

          <FormItem className="sm:col-span-2">
            <Label>{i18n.fields.cuisines.label}</Label>
            <div className="flex gap-2">
              <Input
                value={cuisineInput}
                onChange={(event) => setCuisineInput(event.target.value)}
                onKeyDown={onCuisineKeyDown}
                placeholder={i18n.fields.cuisines.placeholder}
              />
              <Button type="button" variant="secondary" onClick={addCuisine}>
                {i18n.cuisineAdd}
              </Button>
            </div>
            {cuisines.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {cuisines.map((cuisine) => (
                  <span
                    key={cuisine}
                    className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {cuisine}
                    <button
                      type="button"
                      onClick={() => removeCuisine(cuisine)}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Remove ${cuisine}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            ) : null}
          </FormItem>

          <FormField
            control={form.control}
            name="popular"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border border-border p-3 sm:col-span-2">
                <div className="space-y-0.5">
                  <FormLabel>{i18n.fields.popular.label}</FormLabel>
                  <p className="text-xs text-muted-foreground">{i18n.fields.popular.hint}</p>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </Section>

        <Section title={i18n.sections.branding} hint={i18n.sections.brandingHint}>
          {textField("logoUrl", i18n.fields.logoUrl)}
          {textField("menuUrl", i18n.fields.menuUrl)}
        </Section>

        <Section title={i18n.sections.contact} hint={i18n.sections.contactHint}>
          {textField("contactEmail", i18n.fields.contactEmail, "email")}
          {textField("contactPhone", i18n.fields.contactPhone, "tel")}
          {textField("contactWhatsapp", i18n.fields.contactWhatsapp, "tel")}
          {textField("contactAddress", i18n.fields.contactAddress)}
        </Section>

        <Section title={i18n.sections.social} hint={i18n.sections.socialHint}>
          {textField("socialFacebookUrl", i18n.fields.socialFacebookUrl)}
          {textField("socialInstagramUrl", i18n.fields.socialInstagramUrl)}
          {textField("socialYoutubeUrl", i18n.fields.socialYoutubeUrl)}
        </Section>

        <div className="flex justify-end gap-2 border-t border-border pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset(getDefaultValues());
              slugEdited.current = false;
              setCuisineInput("");
            }}
            disabled={isSubmitting}
          >
            {i18n.reset}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? i18n.submitting : i18n.submit}
          </Button>
        </div>
      </form>
    </Form>
  );
};
