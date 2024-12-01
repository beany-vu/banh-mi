import { prisma } from '$lib/server/prisma.js';
import type { RequestHandler } from './$types.ts';

export const PATCH: RequestHandler = async ({ request }) => {
	const body = await request.json();

	try {
		const translations = await prisma.translation.findMany({
			where: {
				projectId: body.projectId,
				locale: 'en'
			}
		});

		const contentEn: Array<{ [key: string]: string }> =
			(translations?.[0]?.content as Array<{ [key: string]: string }>) ?? [];
		const defaultContentForNewLocales: Array<{ [key: string]: string }> =
			contentEn?.map((c: { [key: string]: string }) => ({ ...c, message: '' })) ?? [];

		body.newLocales.forEach(async (locale: string) => {
			await prisma.translation.create({
				data: {
					id: crypto.randomUUID(),
					createdAt: new Date(),
					lastUpdate: new Date(),
					project: { connect: { id: body.projectId } },
					locale: locale,
					content: defaultContentForNewLocales
				}
			});
		});
		return new Response(JSON.stringify({ success: true, status: 201 }), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ project: null, translations: [] }), { status: 500 });
	}
};
