import { formatPrice } from "@catering/utils";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Catering Helper</h1>
      <p>Sample price from shared utils: {formatPrice(2599)}</p>
    </main>
  );
}
