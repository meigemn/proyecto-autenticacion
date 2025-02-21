'use client'
import { useActionState, useEffect } from 'react';
import { login } from '@/lib/actions'


export function LoginForm({ className }) {
    const [state, action, pending] = useActionState(login, {})

    return (
        <form action={action} className={className}>
            <h1 className="text-3xl font-bold mb-4">Iniciar sesión</h1>
            <div className='flex flex-col gap-4'>
                <label>Email
                    <input type='email'
                        name='email'
                        defaultValue={state.fields?.email || ''}
                        placeholder="john.doe@example.com"
                        className='peer block'
                        required
                    />
                    <p className="invisible peer-invalid:visible text-red-300">
                        Por favor, introduce un email válido.
                    </p>
                </label>
                <label>Password
                    <input type="password"
                        name='password'
                        defaultValue={state.fields?.password || ''}
                        placeholder="******"
                        className='block'
                    />
                </label>

                <button type="submit" disabled={pending} className="px-4 py-2 bg-blue-300 disabled:bg-slate-300">
                    {pending ? 'Iniciando sessión...' : 'Iniciar sessión'}
                </button>

                <p className={state?.error ? 'text-red-500' : 'hidden'}> {state.error} </p>
            </div>
        </form>
    );
};