import { ReactNode } from "react";
import { ImSpinner8 } from "react-icons/im";

interface Props {
    children?: ReactNode;
}

export default function LoadingComponent({ children }: Props) {
    return (
        <main className="flex h-screen flex-col items-center justify-center gap-4 bg-neutral-50 text-2xl">
            {children}
            <h2>Loading...</h2>
            <ImSpinner8 className="animate-spin" />
        </main>
    );
}
