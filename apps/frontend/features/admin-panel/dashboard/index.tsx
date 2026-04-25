import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeader } from "../components/section-header";
import { CardItem } from "./components/card-item";

const overviewCards = [
  { title: "Total Revenue", value: "$42,560", link: "#" },
  { title: "Active Users", value: "1,204", link: "#" },
  { title: "Pending Orders", value: "38", link: "#" },
  { title: "Avg. Fulfillment", value: "2.8h", link: "#" },
];

export const Dashboard = () => {
  return (
    <section className="space-y-6" aria-labelledby="dashboard-title">
      <SectionHeader title="Dashboard" description="Track operations, users, and performance in one place." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <CardItem key={card.title} title={card.title} value={card.value} link={card.link} />
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
};
