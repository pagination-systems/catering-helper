import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Phone, SaveIcon, Share2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type UpdateTenantValues, updateTenantSchema } from "../schemas/settings.schema";

interface SettingsFormProps {
  onSubmit: (data: UpdateTenantValues) => void;
  initialValues: UpdateTenantValues;
  submitLabel?: string;
}

export const SettingsForm = ({ onSubmit, initialValues, submitLabel = "Save Settings" }: SettingsFormProps) => {
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
                <span className="text-xs font-medium uppercase tracking-[0.2em]">Branding</span>
              </div>
              <CardTitle className="text-lg">Storefront identity</CardTitle>
              <CardDescription>Shape the name, message, and links customers see first.</CardDescription>
            </CardHeader>
            <CardContent className="mt-4 grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Uttara Catering" {...field} />
                    </FormControl>
                    <FormDescription>Shown across the admin and customer-facing screens.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Premium Menus, Frictionless Customization" {...field} />
                    </FormControl>
                    <FormDescription>A short line that supports your brand promise.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://example.com/logo.png" {...field} />
                    </FormControl>
                    <FormDescription>Use a direct image link so the logo loads reliably.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="menuUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu URL</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="https://example.com/menu" {...field} />
                    </FormControl>
                    <FormDescription>Link to the public menu, brochure, or ordering page.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="0"
                        value={field.value ?? 0}
                        onChange={(event) => field.onChange(event.target.value === "" ? 0 : Number(event.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Shown at checkout before add-ons or taxes.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your tenant proposition and service promise."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Explain what makes the service different in a concise, customer-friendly way.
                    </FormDescription>
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
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">Contact</span>
                </div>
                <CardTitle className="text-lg">Support details</CardTitle>
                <CardDescription>Keep these current so customers can contact you without friction.</CardDescription>
              </CardHeader>
              <CardContent className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="info@company.com" {...field} />
                      </FormControl>
                      <FormDescription>Best for order questions and admin follow-ups.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Phone</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="+880 1711-000000" {...field} />
                      </FormControl>
                      <FormDescription>Use the number customers should call first.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactWhatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="+880 1711-000000" {...field} />
                      </FormControl>
                      <FormDescription>Helpful for quick customer communication.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="123 Corporate Area, Gulshan 1, Dhaka" {...field} />
                      </FormControl>
                      <FormDescription>Shown on invoices and contact pages when relevant.</FormDescription>
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
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">Social</span>
                </div>
                <CardTitle className="text-lg">Public channels</CardTitle>
                <CardDescription>Keep your most visible social links consistent and easy to find.</CardDescription>
              </CardHeader>
              <CardContent className="mt-4 grid gap-4">
                <FormField
                  control={form.control}
                  name="social.facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://facebook.com/your-page" {...field} />
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
                      <FormLabel>Instagram</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://instagram.com/your-handle" {...field} />
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
                      <FormLabel>YouTube</FormLabel>
                      <FormControl>
                        <Input type="url" placeholder="https://youtube.com/@your-channel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/30 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Review the details before saving.</p>
            <p className="text-sm text-muted-foreground">
              These settings update your tenant profile, contact paths, and social presence.
            </p>
          </div>
          <Button type="submit" className="w-full sm:w-auto">
            <SaveIcon className="size-4" />
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
};
