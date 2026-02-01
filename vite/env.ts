import { z } from "zod";
import { REDIRECT_URL_ENDPOINT } from "../src/helpers/redirect-url";

const frontendSchema = z.object({
  VITE_CLIENT_ID: z.string().optional(),
  VITE_HOST: z.string().optional(),
});

export const frontendCredentials = () => frontendSchema.parse(import.meta.env);

export const makeRedirectUriFrontend = (reset: boolean = false) => {
  const credentials = frontendCredentials();
  const host = credentials.VITE_HOST || window.location.origin;
  return `${host}${REDIRECT_URL_ENDPOINT}?reset=${reset}`;
};
