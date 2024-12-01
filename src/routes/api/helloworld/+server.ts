import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response('Hello, World!', {
		status: 200,
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
