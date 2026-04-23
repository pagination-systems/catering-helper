import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <section className="space-y-4" aria-labelledby="users-title">
      <header>
        <h1 id="users-title" className="text-2xl font-semibold tracking-tight">
          Users
        </h1>
        <p className="text-sm text-muted-foreground">Manage roles, permissions, and team access.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
          <CardDescription>RBAC-ready list placeholder for upcoming modules.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Connect this page to your user service and role matrix to complete user administration.
        </CardContent>
      </Card>
    </section>
  );
}
