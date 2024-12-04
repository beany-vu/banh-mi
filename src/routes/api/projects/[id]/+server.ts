import { prisma } from '$lib/server/prisma.js';

export const GET = async ({ params }) => {
	try {
		const project = await prisma.project.findUnique({
			where: { id: params.id },
			include: {
				user: {
					select: {
						email: true,
						id: true,
						name: true,
						password: false
					}
				}
			}
		});

		const translations = await prisma.translation.findMany({
			where: {
				projectId: params.id
			}
		});

		const availableLocales = translations.map((t) => t.locale);

		return new Response(JSON.stringify({ project, translations, availableLocales }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch {
		return new Response(JSON.stringify({ project: null, translations: [] }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
};
