import  NextAuth  from "next-auth";
import Google from '@auth/core/providers/google'
import Github from '@auth/core/providers/github'
import Credentials from '@auth/core/providers/credentials'
import prisma from '@/lib/prisma'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserByEmail, getUserById } from "@/lib/data";
/* configuraciond e las credenciales */

const credentialsConfig = {
    // LOGIN ACTION -> AUTHORIZE -> JWT -> SESSION 
    async authorize(credentials) {
        const user = await getUserByEmail(credentials.email);
        return user ;
    },
}
const options = {
    providers: [
        Credentials(credentialsConfig),
        Google,
        Github
    ],
    adapter: PrismaAdapter(prisma),
    session:{strategy:"jwt"},
    pages:{
        signIn:"/login",
        signOut:"/logout",
    },
    /* objeto con dos funciones para modificar datos de token y sesion */
    callbacks: {
        async jwt({ token }) {
            /* comprueba que se ha generado correctamente el token */
            if (!token.sub) return token;
            /* Se genera le tkoen de acceso a la base de datos */
            const user = await getUserById(token.sub)
            if (!user) return token;
            /* se modifica el token para que contenga el id de usuario y el rol */

            token.role = user?.role
            return token
        },
        /* se modifica la sesion para que contenga el id de usuario y el rol */
        async session({ session, token }) {
            session.user.id = token?.sub
            session.user.role = token?.role
            return session
        }
    }
};

export const{
    handlers: {GET, POST}, 
    auth,
    signIn,
    signOut
} = NextAuth(options);