import { lucia } from '$lib/server/auth.js';
import { prisma } from '$lib/server/prisma.js';
import { json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

interface Payload {
	[locale: string]: {
		[key: string]: string;
	};
}

interface TranslationContent {
	key: string;
	message: string;
}

interface Translation {
	locale: string;
	projectId: string;
	content: TranslationContent[];
	createdAt?: Date;
	lastUpdate?: Date;
}

export const POST = async ({ request, cookies }: RequestEvent) => {
	try {
		const { projectId, newLocale }: { projectId: string; newLocale: string } = await request.json();

		// throw error if projectId does not exist
		const project = await prisma.project.findUnique({
			where: {
				id: projectId
			}
		});
		if (!project) {
			// throw error if project does not exist
			throw { status: 404, message: 'Project not found' };
		}

		const sessionId = cookies.get(lucia.sessionCookieName);
		if (!sessionId) {
			return json({ success: false, error: 'Session ID not found' }, { status: 401 });
		}
		const { session } = await lucia.validateSession(sessionId);

		if (!session?.userId) {
			return json({ success: false, error: 'User ID not found' }, { status: 401 });
		}

		// if session.userId is not equal to project.userId, then return error
		if (session.userId !== project.userId) {
			return json(
				{ success: false, error: 'User is not authorized to create translation' },
				{ status: 401 }
			);
		}

		// throw error if locale already exists
		const translation = await prisma.translation.findFirst({
			where: {
				projectId: projectId,
				locale: newLocale
			}
		});

		if (translation) {
			throw { status: 400, message: 'Locale already exists' };
		}

		await prisma.translation.create({
			data: {
				id: crypto.randomUUID(),
				locale: newLocale,
				projectId: projectId,
				content: JSON.stringify([]),
				createdAt: new Date(),
				lastUpdate: new Date()
			}
		});

		return json({ success: true }, { status: 201 });
	} catch (error) {
		return json(
			{ error: error.message || 'An error occurred while creating the translation' },
			{ status: error.status || 500 }
		);
	}
};

export const PATCH = async ({ request, cookies }: RequestEvent) => {
	const { id, payload, locale }: { id: string; payload: Payload; locale: string } =
		await request.json();
	const translation: Translation | null = await prisma.translation.findUnique({
		where: {
			id: id
		}
	});

	if (!translation) {
		return json({ error: 'Translation not found' }, { status: 404 });
	}
	const oldContent: TranslationContent[] = translation.content ?? [];
	if (!oldContent) {
		return json({ error: 'Old content not found' }, { status: 404 });
	}
	const newContent: TranslationContent[] = oldContent.map((c) => {
		if (payload?.[locale]?.[c.key] !== undefined) {
			return {
				...c,
				message: payload?.[locale]?.[c.key]
			};
		}
		return c;
	});

	await prisma.translation.update({
		where: {
			id: id
		},
		data: {
			content: JSON.stringify(newContent)
		}
	});

	console.log({ translation, id, payload });
	return json({ success: true }, { status: 200 });
};
