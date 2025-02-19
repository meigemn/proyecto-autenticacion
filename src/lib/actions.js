'use server'
import { signIn } from "@/auth";
import { signOut } from "@/auth";

export async function login() {
    await signIn('google',{redirectTo:'/dashboard'})
}

export async function logout() {
    'use server'
    await signOut({redirectTo:'/login'})
}


