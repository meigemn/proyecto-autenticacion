import { signOut } from "@/auth";

async function logout() {
    'use server'
    await signOut({redirectTo:'/login'})
}

function PaginaSignOut() {
    return (
        <div className="flex flex-col items-center justify-center">
            <form action={logout}>
                <button>signOut</button>
            </form>
        </div>
    );
}

export default PaginaSignOut;