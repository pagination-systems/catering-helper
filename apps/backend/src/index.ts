import express from "express";
import { formatPrice } from "@catering/utils";

const app = express();
const port = Number(process.env.PORT ?? 5000);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({
    service: "backend",
    examplePrice: formatPrice(1299),
  });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
