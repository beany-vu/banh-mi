import type { RequestHandler } from './$types.ts';

export const PATCH: RequestHandler = async ({ request, params }) => {
	console.log('params', params, request);

	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
