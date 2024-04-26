import { useAuth0 } from "@auth0/auth0-react";

export default function LoginComponent() {
    const { loginWithRedirect } = useAuth0();

    return (
        <main className="px-8 h-screen flex flex-col justify-center items-center gap-8">
            <h2 className="text-2xl font-bold">DielTest</h2>
            <p className="text-center text-md text-lg max-w-[600px]">
                Se existe realmente uma pessoa visualizando este teste, peço que
                quando me enviar o feedback, seja ele positivo ou negativo,
                enviar com a frase <strong>"Eu verifiquei a melancia"</strong>.
            </p>
            <button
                type="button"
                className="bg-neutral-500 text-2xl font-bold text-neutral-50 px-16 py-2 rounded-full shadow-sm"
                onClick={() => loginWithRedirect()}
            >
                Login
            </button>
        </main>
    );
}
