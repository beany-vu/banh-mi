import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth.js';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma.js'; // Ensure this line is correct

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const { email, password, name } = Object.fromEntries(data) as Record<string, string>;
		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(password);
		const user = await prisma.user.create({
			data: {
				id: userId,
				email: email,
				name: name,
				password: hashedPassword
			}
		});
		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
		return redirect(302, '/');
	}
};
