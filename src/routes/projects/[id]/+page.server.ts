import { prisma } from '$lib/server/prisma.js';
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
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

		return { project, translations, availableLocales };
	} catch (error) {
		console.error(error);
		return { project: null, translations: [] };
	}
};
