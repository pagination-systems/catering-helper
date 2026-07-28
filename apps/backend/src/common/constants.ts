import { env } from "../.config/env";

// The platform's own apex, derived from CLIENT_URL (e.g. https://app.example.com).
const rootHost = (() => {
  try {
    return new URL(env.CLIENT_URL).hostname.toLowerCase();
  } catch {
    return "";
  }
})();

// Multi-tenant: browsers call the API from https://<tenant>.<root>, so a static
// allow-list can't work. Allow the root host and any subdomain of it, plus
// localhost for dev. `origin` is undefined for same-origin / non-browser calls.
export const corsOrigin = (
  origin: string | undefined,
  cb: (err: Error | null, allow?: boolean) => void,
): void => {
  if (!origin) {
    cb(null, true);
    return;
  }

  let host: string;
  try {
    host = new URL(origin).hostname.toLowerCase();
  } catch {
    cb(null, false);
    return;
  }

  const allowed =
    host === "localhost" ||
    (rootHost !== "" && (host === rootHost || host.endsWith(`.${rootHost}`)));

  cb(null, allowed);
};
