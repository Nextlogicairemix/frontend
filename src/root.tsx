import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";

import globals from "./globals.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globals },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];