import { useAuth0 } from "@auth0/auth0-react";

export default function LoginComponent() {
    const { loginWithRedirect } = useAuth0();

    return (
        <main className="flex h-screen flex-col items-center justify-center gap-8 px-8">
            <h2 className="text-2xl font-bold">DielTest</h2>
            <p className="text-md max-w-[600px] text-center text-lg">
                Se existe realmente uma pessoa visualizando este teste, peço que
                quando me enviar o feedback, seja ele positivo ou negativo,
                enviar com a frase <strong>"Eu verifiquei a melancia"</strong>.
            </p>
            <button
                type="button"
                className="rounded-full bg-neutral-500 px-16 py-2 text-2xl font-bold text-neutral-50 shadow-sm"
                onClick={() => loginWithRedirect()}
            >
                Login
            </button>
        </main>
    );
}
