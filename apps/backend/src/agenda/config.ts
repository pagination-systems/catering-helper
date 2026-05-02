import Agenda from "agenda";
import { env } from "../.config/env";

export const agenda = new Agenda({
  db: {
    address: env.MONGO_URL,
    collection: "agendajobs",
  },
});
