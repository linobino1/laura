import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
  type HeadersFunction,
} from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import type { Config, Work } from "payload/generated-types";
import BackToTop from "~/components/BackToTop";
import Blocks from "~/components/blocks/Blocks";
import i18next from "~/i18next.server";
import generateTitle from "~/util/generateTitle";

export const loader = async ({
  request,
  params: { slug },
  context: { payload },
}: LoaderFunctionArgs) => {
  const locale = (await i18next.getLocale(request)) as Config["locale"];

  const [workDocs, categories] = await Promise.all([
    payload.find({
      collection: "works",
      where: {
        slug: {
          equals: slug,
        },
      },
      locale,
    }),
    payload.find({
      collection: "categories",
      locale,
    }),
  ]);

  if (!workDocs.totalDocs) {
    throw redirect("/404");
  }

  return json(
    { categories: categories.docs, work: workDocs.docs[0] as Work },
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
  return [
    {
      title: generateTitle(rootLoaderData?.site, data?.work),
    },
    // TODO meta description
  ];
};

export const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") as string,
});

export default function Work() {
  const { work } = useLoaderData<typeof loader>();

  return (
    <>
      <Blocks blocks={work.layout} />
      <BackToTop />
    </>
  );
}
