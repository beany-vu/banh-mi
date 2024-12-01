import { type Actions, type Load } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth.js';
import { prisma } from '$lib/server/prisma.js';

export const load: Load = async () => {
	try {
		const projects = await prisma.project.findMany({
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

		return { projects: projects };
	} catch (error) {
		console.error(error);
		return { projects: [] };
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }: import('@sveltejs/kit').RequestEvent) => {
		try {
			const data = await request.formData();
			console.log(data);
			// get user id from session or cookie  or lucia

			const sessionId = cookies.get(lucia.sessionCookieName);
			if (!sessionId) {
				return { success: false, error: 'Session ID not found' };
			}
			const { session } = await lucia.validateSession(sessionId);

			if (!session?.userId) {
				return { success: false, error: 'User ID not found' };
			}

			const project = {
				id: Math.random().toString(36).substring(7),
				name: data.get('name') as string,
				description: data.get('description') as string,
				createdAt: new Date().toISOString(),
				lastUpdate: new Date().toISOString(),
				userId: session.userId,
				metaData: {}
			};

			// if found the project with the same name and user id, then return error
			const existingProject = await prisma.project.findFirst({
				where: {
					name: project.name as string,
					userId: project.userId
				}
			});

			if (existingProject) {
				return { success: false, error: 'Project with the same name already exists' };
			}
			// insert project into database
			await prisma.project.create({ data: project });
			console.log(project);

			return { success: true, message: 'Project created successfully' };
		} catch (error) {
			console.error(error);
			return { success: false, error: 'Server error, please try again later' };
		}
	}
};
