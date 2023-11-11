import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Prose from 'components/prose';
import { getArticle } from 'lib/shopify';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { article: string };
}): Promise<Metadata> {
  const article = await getArticle(params.article, 'News');

  if (!article) return notFound();

  return {
    title: article.seo?.title || article.title,
    description: article.seo?.description || article.excerpt,
    openGraph: {
      publishedTime: article.publishedAt,
      type: 'article'
    }
  };
}

export default async function Article({
  params
}: {
  params: { article: string };
}) {
  console.log({ params })
  const article = (await getArticle(params.article, 'News'));

  if (!article) return notFound();

  return (
    <>
      <h1 className="mb-8 text-5xl font-bold">{article.title}</h1>
      <Prose className="mb-8" html={article.content as string} />
      <p className="text-sm italic">
        {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(new Date(article.publishedAt))}.`}
      </p>
    </>
  );
}