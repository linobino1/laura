import Gutter from "~/components/Gutter";
import Blocks from "~/components/blocks/Blocks";
import generateTitle from "~/util/generateTitle";
import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import i18next from "~/i18next.server";
import { useLoaderData } from "@remix-run/react";
import type { Page } from "payload/generated-types";

export const loader = async ({
  request,
  params: { page },
  context: { payload },
}: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);

  const pageDocs = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: page ?? "home",
      },
    },
    locale,
  });
  const categories = await payload.find({
    collection: "categories",
    locale,
  });

  if (!pageDocs.totalDocs) {
    throw redirect("/404");
  }

  return { categories: categories.docs, page: pageDocs.docs[0] as Page };
};

export const meta: MetaFunction<typeof loader> = ({ data, matches }) => {
  const rootLoaderData = matches.find((match) => match.id === "root")
    ?.data as any;
  return [
    {
      title: generateTitle(rootLoaderData?.site, data?.page),
    },
    // TODO meta description
  ];
};

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <>
      <Gutter size="small">
        <h2 className="mb-6 mt-0 uppercase">{page.title}</h2>
      </Gutter>
      <Blocks blocks={page.layout} />
    </>
  );
}
