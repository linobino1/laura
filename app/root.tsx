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
import "./root.css";
import i18next from "./i18next.server";
import { i18nCookie } from "./cookies";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next";
import GlobalPadding from "./components/GlobalPadding";
import BackToTop from "./components/BackToTop";
import Navigation from "./components/Navigation";
import GlobalGrid from "./components/GlobalGrid";
import Header from "./components/Header";

export const meta: MetaFunction = () => [
  { title: "Welcome to RePay!" },
  { charSet: "utf-8" },
  { name: "viewport", content: "width=device-width, initial-scale=1" },
];

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

export default function App() {
  const { locale, ENV, site, navigation } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()} className="font-serif">
      <head>
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </head>
      <body>
        <ScrollRestoration />
        <Scripts />
        <GlobalPadding>
          <Header navigation={navigation} site={site} />
        </GlobalPadding>
        <div className="pointer-events-none sticky z-30 h-0 w-full">
          <GlobalPadding>
            <GlobalGrid>
              <Navigation
                navigation={navigation}
                className="pointer-events-auto col-span-3 hidden text-[12px] md:flex"
              />
            </GlobalGrid>
          </GlobalPadding>
        </div>
        <GlobalPadding>
          <Outlet />
        </GlobalPadding>
        <BackToTop />
      </body>
    </html>
  );
}
