// pages/article/[id].tsx
import type { Metadata } from 'next';

import Prose from 'components/prose';
import { getArticle } from 'lib/shopify';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

export const revalidate = 43200; // 12 hours in seconds

export async function generateMetadata({
    params
}: {
    params: { id: string };
}): Promise<Metadata> {
    const article = await getArticle(params.id);

    if (!article) return notFound();

    return {
        title: article.title,
        description: article.content,
        openGraph: {
            publishedTime: article.publishedAt,
            type: 'article'
        }
    };
}

export default async function Article({ params }: { params: { id: string } }) {
    const article = await getArticle(params.id);

    if (!article) return notFound();

    return (
        <>
            <h1 className="mb-8 text-5xl font-bold">{article.title}</h1>
            <Prose className="mb-8" html={article.content} />
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