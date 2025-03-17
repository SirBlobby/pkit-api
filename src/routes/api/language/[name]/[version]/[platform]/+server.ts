import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/db';

export const GET: RequestHandler = async({ params }) => {

    let name = params.name;
    let version = params.version;
    let platform = params.platform;

    let data = await db.languages.get({ name, version, platform });

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};