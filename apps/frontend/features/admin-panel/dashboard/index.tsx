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
    </section>
  );
};
