import { ImSpinner8 } from "react-icons/im";

export default function LoadingComponent() {
    return (
        <main className="flex flex-col gap-4 text-2xl bg-neutral-50 justify-center items-center h-screen">
            <h2>Loading...</h2>
            <ImSpinner8 className="animate-spin" />
        </main>
    );
}
