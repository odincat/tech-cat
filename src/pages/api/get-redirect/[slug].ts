import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@server/utils/db-client';

const handleShortlinkRedirect = async (request: NextApiRequest, response: NextApiResponse) => {
    const slug = request.query['slug'];

    if (!slug || typeof slug !== 'string') {
        response.status(404).send(
            JSON.stringify({
                message:
                    '[TechCat Redirection Headquarters] You need to provide a slug, in order to get a redirect.',
            }),
        );

        return;
    }

    const data = await db.shortLink.findFirst({
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    if (!data) {
        response.status(404).json({
            message:
                '[TechCat Redirection Headquarters] Slug not found. Get rekt!',
        });
        return;
    }

    return response
        .setHeader('Content-Type', 'application/json')
        .setHeader('Access-Control-Allow-Origin', '*')
        .setHeader(
            'Cache-Control',
            's-maxage=1000000000, stale-while-revalidate',
        )
        .send(data);
};

export default handleShortlinkRedirect; 