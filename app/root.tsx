import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "./global.css";
import i18next from "./i18next.server";
import { i18nCookie } from "./cookies";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import Header from "./components/Header";

export async function loader({
  request,
  context: { payload, user },
}: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request);
  const [site, navigation, localeCookie] = await Promise.all([
    await payload.findGlobal({
      slug: "site",
      locale,
    }),
    await payload.findGlobal({
      slug: "navigation",
      locale,
      depth: 5,
    }),
    i18nCookie.serialize(locale),
  ]);
  return json(
    {
      ENV: {
        PAYLOAD_PUBLIC_SERVER_URL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
      },
      locale,
      user,
      site,
      navigation,
    },
    {
      headers: {
        "Set-Cookie": localeCookie,
      },
    },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: data?.site.meta?.title },
];

export default function App() {
  const { locale, ENV, site, navigation } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()} className="font-serif">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </head>
      <body>
        <Header navigation={navigation} site={site} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
