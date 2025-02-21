'use server'
import bcrypt from 'bcryptjs'
import prisma from '@/lib/prisma'
import { signIn, signOut } from '@/auth';
import { redirect } from 'next/navigation';


export async function register(prevState, formData) {
    /* datos que mete el usuario en el input */
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    // Comprobamos si el usuario ya está registrado
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    /* si el usuario ya esta registrado se muestra un error */
    if (user) {
        return {
            error: 'El email ya está registrado',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Encriptamos password con 10 vueltas
    const hashedPassword = await bcrypt.hash(password, 10)

    // Guardamos credenciales en base datos
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })
/* una vez se registra se redirige a la pagina de login */
    redirect('/login')
}



export async function login(prevState, formData) {
    const email = formData.get('email')
    const password = formData.get('password')

    // Comprobamos si el usuario está registrado
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return {
            error: 'Usuario no registrado.',
            fields: Object.fromEntries(formData.entries())
        }
    }

    // Comparamos password 
    const matchPassword = await bcrypt.compare(password, user.password)

    if (user && matchPassword) {  // && user.emailVerified
        if (user.role === 'ADMIN')
            await signIn('credentials', { email, password, redirectTo: '/admin' })
        else
            await signIn('credentials', { email, password, redirectTo: '/dashboard' })
    } else {
        return {
            error: 'Credenciales incorrectas.',
            fields: Object.fromEntries(formData.entries())
        }
    }
}

export async function loginGoogle() {
    await signIn('google',{redirectTo:'/dashboard'})
}

export async function logout() {
    await signOut({redirectTo:'/login'})
}


