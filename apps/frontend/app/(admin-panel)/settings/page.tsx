import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <section className="space-y-4" aria-labelledby="settings-title">
      <header>
        <h1 id="settings-title" className="text-2xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">Configure platform preferences and system controls.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Shared settings surface for multi-tenant extensions.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Add tenant-specific branding, billing, and automation configuration in this section.
        </CardContent>
      </Card>
    </section>
  );
}
