import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/db';

export const GET: RequestHandler = async({ params }) => {

    let name = params.name;

    let data = await db.languages.get({ name });

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};