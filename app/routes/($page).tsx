import Blocks from "~/components/blocks/Blocks";
import generateTitle from "~/util/generateTitle";
import type {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import i18next from "~/i18next.server";
import { json, redirect, useLoaderData } from "@remix-run/react";
import type { Page } from "payload/generated-types";

export const loader = async ({
  request,
  params: { page },
  context: { payload },
}: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);

  if (page === "home") {
    return redirect("/", 301); // redirect to the root page
  }

  const [pageDocs, categories] = await Promise.all([
    payload.find({
      collection: "pages",
      where: {
        slug: {
          equals: page ?? "home",
        },
      },
      locale,
    }),
    payload.find({
      collection: "categories",
      locale,
    }),
  ]);

  return json(
    { categories: categories.docs, page: pageDocs.docs[0] },
    {
      headers: {
        // revalidate after 60s, serve stale for 31 days
        "Cache-Control": "s-maxage: 60, stale-while-revalidate: 2678400",
      },
    },
  );
};

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const rootLoaderData = matches.find((match) => match.id === "root")
    ?.data as any;
  const title = generateTitle(rootLoaderData?.site, data?.page);
  return [
    {
      title,
    },
    {
      name: "og:title",
      content: title,
    },
  ];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") as string,
});

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return page && page.layout?.length ? <Blocks blocks={page.layout} /> : <></>;
}
