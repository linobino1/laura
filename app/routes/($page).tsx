import Blocks from "~/components/blocks/Blocks";
import generateTitle from "~/util/generateTitle";
import { type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
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

  return { categories: categories.docs, page: pageDocs.docs[0] };
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

  return page && page.layout?.length ? (
    <div className="my-12 md:flex md:min-h-[66vh] md:flex-col md:justify-center">
      <Blocks blocks={page.layout} />
    </div>
  ) : (
    <></>
  );
}
