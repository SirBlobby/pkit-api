import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/db';

export const GET: RequestHandler = async({ url }) => {

    let languages:string[] = [];

    let allData = await db.languages.getAll();

    allData.forEach(async (data) => {
        if(!languages.includes(data.name)) {
            languages.push(data.name);   
        }
    });

    return new Response(JSON.stringify(languages), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};