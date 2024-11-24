import lucia from 'lucia-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const auth = lucia({
    adapter: {
        getUser: async (id) => {
            return await prisma.user.findUnique({ where: { id } });
        },
        getUserByEmail: async (email) => {
            return await prisma.user.findUnique({ where: { email } });
        },
        createUser: async (data) => {
            return await prisma.user.create({ data });
        },
        updateUser: async (id, data) => {
            return await prisma.user.update({ where: { id }, data });
        },
        deleteUser: async (id) => {
            return await prisma.user.delete({ where: { id } });
        }
    },
    secret: process.env.LUCIA_SECRET,
    env: process.env.NODE_ENV
});