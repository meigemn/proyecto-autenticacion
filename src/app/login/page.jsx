import { auth } from '@/auth';
import { LoginForm } from '@/components/login-form'
import { RegisterForm } from '@/components/register-form';
import { redirect } from 'next/navigation';
import { CirclePlus, Play } from 'lucide-react';

// https://next-auth.js.org/configuration/pages#sign-in-page
const errors = new Map();
errors.set('OAuthSignin', "Error al construir una URL de autorización.");
errors.set('OAuthCallback', "Error al manejar la respuesta de un proveedor de OAuth.");
errors.set('OAuthCreateAccount', "No se pudo crear un usuario proveedor de OAuth en la base de datos.");
errors.set('EmailCreateAccount', "No se pudo crear un usuario de proveedor de correo electrónico en la base de datos.");
errors.set('Callback', "Error en la ruta del controlador de devolución de llamada de OAuth.");
errors.set('OAuthAccountNotLinked', "Este email ya está registrado con otro proveedor.");
errors.set('EmailSignin', "Comprueba tu dirección de correo electrónico.");
errors.set('CredentialsSignin', "Fallo al iniciar sesion. Verifique que los datos que proporcionó sean correctos.");
errors.set('SessionRequired', "Error al iniciar sesión. Verifique que los detalles que proporcionó sean correctos.");
errors.set('Default', "No se puede iniciar sesión.");


async function PaginaLogin({ searchParams }) {
    const { error } = await searchParams
    /* si hay una sesion abierta se redirige a la dashboard */
    const sesion = await auth()

    if (sesion) redirect('/dashboard')

    return (
        <div className="mt-4 border-2 border-slate-400 rounded-md mx-auto w-fit p-8 flex flex-col gap-2">
            {/* En Tailwind, la clase peer funciona sólo entre hermanos (siblings) */}
            {/* https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-peers */}

            <input
                id="signup"
                type="radio" name="sign"
                className="hidden peer/register"
                defaultChecked={true} />
            <label
            /* label asociado al anterior input */
                htmlFor="signup"
                title="Registro"
                className='self-end text-slate-300 peer-checked/register:text-black'>
                <CirclePlus />
            </label>

            <input
                id="signin"
                title="Iniciar sesión"
                type="radio" name="sign"
                className="hidden peer/login"
                defaultChecked={true} />
            <label
                htmlFor="signin"
                title="Iniciar sesión"
                className='self-end text-slate-300 peer-checked/login:text-black'>
                <Play />
            </label>

            <RegisterForm className="hidden peer-checked/register:block" />
            <LoginForm className="hidden peer-checked/login:block" />
            {error && <p>{errors.get(error)}</p>}
        </div>
    )
}

export default PaginaLogin;