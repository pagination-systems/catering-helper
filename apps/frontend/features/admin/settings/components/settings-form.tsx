import { TenantAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Phone, SaveIcon, Share2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Can } from "@/authz/ability-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSettingsI18n } from "../lib/settings-i18n";
import type { UpdateTenantValues } from "../schemas/settings.schema";
import { updateTenantSchema } from "../schemas/settings.schema";

interface SettingsFormProps {
  onSubmit: (data: UpdateTenantValues) => void;
  initialValues: UpdateTenantValues;
  submitLabel?: string;
}

export const SettingsForm = ({ onSubmit, initialValues, submitLabel }: SettingsFormProps) => {
  const i18n = useSettingsI18n();
  const form = useForm<UpdateTenantValues, unknown, UpdateTenantValues>({
    resolver: zodResolver(updateTenantSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [form, initialValues]);

  const handleSubmit = (data: UpdateTenantValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.95fr)]">
          <Card size="sm" className="border-border/70 shadow-sm">
            <CardHeader className="space-y-2 border-b pb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="size-4" />
                <span className="text-xs font-medium uppercase tracking-[0.2em]">{i18n.branding.sectionLabel}</span>
              </div>
              <CardTitle className="text-lg">{i18n.branding.cardTitle}</CardTitle>
              <CardDescription>{i18n.branding.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent className="mt-4 grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.branding.nameLabel}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={i18n.branding.namePlaceholder} {...field} />
                    </FormControl>
                    <FormDescription>{i18n.branding.nameDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.branding.headlineLabel}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={i18n.branding.headlinePlaceholder} {...field} />
                    </FormControl>
                    <FormDescription>{i18n.branding.headlineDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.branding.logoUrlLabel}</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder={i18n.branding.logoUrlPlaceholder} {...field} />
                    </FormControl>
                    <FormDescription>{i18n.branding.logoUrlDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="menuUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.branding.menuUrlLabel}</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder={i18n.branding.menuUrlPlaceholder} {...field} />
                    </FormControl>
                    <FormDescription>{i18n.branding.menuUrlDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.branding.deliveryFeeLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder={i18n.branding.deliveryFeePlaceholder}
                        value={field.value ?? 0}
                        onChange={(event) => field.onChange(event.target.value === "" ? 0 : Number(event.target.value))}
                      />
                    </FormControl>
                    <FormDescription>{i18n.branding.deliveryFeeDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastOrderTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i18n.branding.lastOrderTimeLabel}</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        placeholder={i18n.branding.lastOrderTimePlaceholder}
                        value={field.value ?? ""}
                        onChange={(event) => field.onChange(event.target.value)}
                      />
                    </FormControl>
                    <FormDescription>{i18n.branding.lastOrderTimeDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>{i18n.branding.descriptionLabel}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={i18n.branding.descriptionPlaceholder} rows={5} {...field} />
                    </FormControl>
                    <FormDescription>{i18n.branding.descriptionDescription}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card size="sm" className="border-border/70 shadow-sm">
              <CardHeader className="space-y-2 border-b pb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">{i18n.contact.sectionLabel}</span>
                </div>
                <CardTitle className="text-lg">{i18n.contact.cardTitle}</CardTitle>
                <CardDescription>{i18n.contact.cardDescription}</CardDescription>
              </CardHeader>
              <CardContent className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.contact.emailLabel}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={i18n.contact.emailPlaceholder} {...field} />
                      </FormControl>
                      <FormDescription>{i18n.contact.emailDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.contact.phoneLabel}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder={i18n.contact.phonePlaceholder} {...field} />
                      </FormControl>
                      <FormDescription>{i18n.contact.phoneDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactWhatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.contact.whatsappLabel}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder={i18n.contact.whatsappPlaceholder} {...field} />
                      </FormControl>
                      <FormDescription>{i18n.contact.whatsappDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>{i18n.contact.addressLabel}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder={i18n.contact.addressPlaceholder} {...field} />
                      </FormControl>
                      <FormDescription>{i18n.contact.addressDescription}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card size="sm" className="border-border/70 shadow-sm">
              <CardHeader className="space-y-2 border-b pb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Share2 className="size-4" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">{i18n.social.sectionLabel}</span>
                </div>
                <CardTitle className="text-lg">{i18n.social.cardTitle}</CardTitle>
                <CardDescription>{i18n.social.cardDescription}</CardDescription>
              </CardHeader>
              <CardContent className="mt-4 grid gap-4">
                <FormField
                  control={form.control}
                  name="social.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.social.facebookLabel}</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder={i18n.social.facebookPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="social.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.social.instagramLabel}</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder={i18n.social.instagramPlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="social.youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{i18n.social.youtubeLabel}</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder={i18n.social.youtubePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <Can I={AbilityAction.UPDATE} a={TenantAuthZEntity}>
          <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{i18n.form.reviewMessage}</p>
              <p className="text-sm text-muted-foreground">{i18n.form.reviewDescription}</p>
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              <SaveIcon className="size-4" />
              {submitLabel || i18n.form.submitLabel}
            </Button>
          </div>
        </Can>
      </form>
    </Form>
  );
};
