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
import getOptimizedImageUrl from "./util/getOptimizedImageUrl";
import type { Config, Media } from "payload/generated-types";

export async function loader({
  request,
  context: { payload, user },
}: LoaderFunctionArgs) {
  const locale = (await i18next.getLocale(request)) as Config["locale"];
  const [site, navigation, localeCookie] = await Promise.all([
    payload.findGlobal({
      slug: "site",
      locale,
    }),
    payload.findGlobal({
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
  {
    name: "og:title",
    content: data?.site.meta?.title,
  },
];

export default function App() {
  const { locale, ENV, site, navigation } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()} className="font-serif">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        {site.meta?.description && (
          <>
            <meta name="description" content={site.meta.description} />
            <meta property="og:description" content={site.meta.description} />
          </>
        )}
        {site.meta?.image && (
          <meta
            property="og:image"
            content={getOptimizedImageUrl(
              (site.meta.image as Media).url as string,
              {
                width: 1200,
              },
            )}
          />
        )}

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
        <div className="mb-12 mt-8 md:flex md:min-h-[66vh] md:flex-col md:justify-center lg:mt-24">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
