"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type MarketingPagesContent, marketingPagesContent } from "@/lib/i18n";
import { toast } from "@/lib/toast";
import { useLanguage } from "@/providers/language-provider";

import { PageHeader } from "../components/page-header";

const SUPPORT_EMAIL = "support@cateringhelper.com.bd";

const infoIcons = [Mail, Phone, MessageCircle, Clock, MapPin] as const;

export const Contact = () => {
  const { language } = useLanguage();
  const content = (marketingPagesContent[language] as MarketingPagesContent).contact;
  const { form } = content;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = `${message}\n\n— ${name} (${email})`;
    const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    toast.success(form.success);
    window.location.href = mailto;
  };

  return (
    <>
      <PageHeader badge={content.badge} title={content.title} subtitle={content.subtitle} />

      <section className="bg-background py-14 sm:py-16">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-foreground">
              {content.infoTitle}
            </h2>

            <div className="mt-6 space-y-3">
              {content.info.map((item, index) => {
                const Icon = infoIcons[index] ?? Mail;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3"
                  >
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-[14px] text-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: 0.08 }}
          >
            <Card className="rounded-2xl border border-border bg-card shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-[20px] font-semibold tracking-[-0.01em] text-foreground">{form.title}</h2>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-name">{form.name}</Label>
                      <Input
                        id="contact-name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder={form.namePlaceholder}
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email">{form.email}</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={form.emailPlaceholder}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-subject">{form.subject}</Label>
                    <Input
                      id="contact-subject"
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      placeholder={form.subjectPlaceholder}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact-message">{form.message}</Label>
                    <Textarea
                      id="contact-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder={form.messagePlaceholder}
                      className="min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="h-11 w-full rounded-[8px] text-[13px] font-semibold">
                    {form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  );
};
