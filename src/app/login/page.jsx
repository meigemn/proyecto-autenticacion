import { signIn } from "@/auth";

async function login() {
    'use server'
    await signIn('google',{redirectTo:'/dashboard'})
}

function PaginaLogin() {
    return (
        <div>
            <form action={login}>
                <button>Login</button>
            </form>
        </div>
    );
}

export default PaginaLogin;