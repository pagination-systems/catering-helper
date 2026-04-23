import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const overviewCards = [
  { title: "Total Revenue", value: "$42,560", meta: "+8.2% from last month" },
  { title: "Active Users", value: "1,204", meta: "+3.1% from last week" },
  { title: "Pending Orders", value: "38", meta: "6 high priority" },
  { title: "Avg. Fulfillment", value: "2.8h", meta: "Improved by 14m" },
];

export function DashboardPage() {
  return (
    <section className="space-y-6" aria-labelledby="dashboard-title">
      <header className="space-y-1">
        <h1 id="dashboard-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">Track operations, users, and performance in one place.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <Card key={card.title} className="border-border/70">
            <CardHeader className="pb-2">
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className="text-2xl">{card.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{card.meta}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent actions from your team and automation jobs.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>User "Rahim" updated role permissions.</li>
              <li>Checkout workflow published for tenant "North Kitchen".</li>
              <li>Nightly reporting completed successfully.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Key service status for quick diagnostics.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center justify-between">
                API
                <span className="font-medium text-emerald-600">Operational</span>
              </li>
              <li className="flex items-center justify-between">
                Queue
                <span className="font-medium text-emerald-600">Operational</span>
              </li>
              <li className="flex items-center justify-between">
                Database
                <span className="font-medium text-emerald-600">Operational</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export { DashboardPage as default };
