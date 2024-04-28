import { ImSpinner8 } from "react-icons/im";

export default function LoadingComponent() {
    return (
        <main className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-50 text-2xl">
            <h2>Loading...</h2>
            <ImSpinner8 className="animate-spin" />
        </main>
    );
}
