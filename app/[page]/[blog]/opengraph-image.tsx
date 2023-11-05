import OpengraphImage from 'components/opengraph-image';
import { getBlog } from 'lib/shopify'; // replace with your actual function

export const runtime = 'edge';

export default async function Image({ params }: { params: { post: string } }) {
    const post = await getBlog(params.post);
    const title = post.title;

    return await OpengraphImage({ title });
}