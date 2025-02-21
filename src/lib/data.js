'use server'
import prisma from "@/lib/prisma";

/* consultas a la base de datos */

/* obtiene usuario segun el email */
export async function getUserByEmail(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    return user
}

/* obtiene usuario segun el id */
export async function getUserById(id) {
    const user = await prisma.user.findUnique({
        where: { id }
    });

    return user
}