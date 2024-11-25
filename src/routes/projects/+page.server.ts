import { type Action, type Load } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth.js";
import { prisma } from "$lib/server/prisma.js";

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

export const actions: Action = {
    default: async ({ request, cookies }) => {
        try {
            const data = await request.formData();
            console.log(data);
            // get user id from session or cookie  or lucia

            const { session } = await lucia.validateSession(cookies.get(lucia.sessionCookieName));

            const project = {
                id: Math.random().toString(36).substring(7),
                name: data.get('name'),
                description: data.get('description'),
                createdAt: new Date().toISOString(),
                lastUpdate: new Date().toISOString(),
                userId: session?.userId,
                metaData: {}
            }

            // insert project into database
            await prisma.project.create({ data: project });
            console.log(project);

            return { success: true, message: "Project created successfully" };
        } catch (error) {
            console.error(error);
            return { success: false, error: "Server error, please try again later" };
        }
    }
}