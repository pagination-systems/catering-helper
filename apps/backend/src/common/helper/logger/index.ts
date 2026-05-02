import { env } from "../../../.config/env";
import developmentLogger from "./development";
import productionLogger from "./production";

export let logger = developmentLogger; // default is set as development logger
if (env.NODE_ENV === "development") logger = developmentLogger;
if (env.NODE_ENV === "production") logger = productionLogger;
