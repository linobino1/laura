import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Work } from "payload/generated-types";
import BackToTop from "~/components/BackToTop";
import Gutter from "~/components/Gutter";
import Blocks from "~/components/blocks/Blocks";
import i18next from "~/i18next.server";
import generateTitle from "~/util/generateTitle";

export const loader = async ({
  request,
  params: { slug },
  context: { payload },
}: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);

  const workDocs = await payload.find({
    collection: "works",
    where: {
      slug: {
        equals: slug,
      },
    },
    locale,
  });
  const categories = await payload.find({
    collection: "categories",
    locale,
  });

  if (!workDocs.totalDocs) {
    throw redirect("/404");
  }

  return { categories: categories.docs, work: workDocs.docs[0] as Work };
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

export default function Work() {
  const { work } = useLoaderData<typeof loader>();

  return (
    <>
      <Gutter size="small">
        <h2 className="mb-6 mt-0 uppercase">{work.title}</h2>
      </Gutter>
      <Blocks blocks={work.layout} />
      <BackToTop />
    </>
  );
}
