import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type InvitePlatformAdminValues, invitePlatformAdminSchema } from "../schemas/user.schema";

interface InvitationFormProps {
  onSubmit: (data: InvitePlatformAdminValues) => void;
  initialValues?: InvitePlatformAdminValues;
  submitLabel?: string;
}

const getDefaultValues = (initialValues?: InvitePlatformAdminValues): InvitePlatformAdminValues => ({
  phone: initialValues?.phone ?? "",
});

export const InvitationForm = ({ onSubmit, initialValues, submitLabel = "Submit" }: InvitationFormProps) => {
  const form = useForm<InvitePlatformAdminValues>({
    resolver: zodResolver(invitePlatformAdminSchema),
    defaultValues: getDefaultValues(initialValues),
  });

  useEffect(() => {
    form.reset(getDefaultValues(initialValues));
  }, [form, initialValues]);

  const handleSubmit = (data: InvitePlatformAdminValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form className="flex h-full flex-col pt-2" onSubmit={form.handleSubmit(handleSubmit)} noValidate>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-auto flex justify-end border-t pt-4">
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>
    </Form>
  );
};
