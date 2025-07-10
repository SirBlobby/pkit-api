import type { RequestHandler } from '@sveltejs/kit';

import { db } from '$lib/db';

export const GET: RequestHandler = async({ params, url }) => {

    let name = params.name;

    let platform = url.searchParams.get('platform');
    let arch = url.searchParams.get('arch');

    let data = await db.languages.get({ name });

    if (platform) data = data.filter((x: any) => x.platform === platform);
    if (arch) data = data.filter((x: any) => x.arch === arch);

    data.sort((a: any, b: any) => {
        const versionA = a.version.split('.').map(Number);
        const versionB = b.version.split('.').map(Number);

        for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
            const numA = versionA[i] || 0;
            const numB = versionB[i] || 0;

            if (numA !== numB) {
                return numB - numA; 
            }
        }
        return 0;
    });

    data = data.map((x: any) => {
        const { _id, ...rest } = x;
        return rest;
    });

    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};