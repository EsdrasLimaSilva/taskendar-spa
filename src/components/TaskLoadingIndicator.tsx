import { ImSpinner8 } from "react-icons/im";

export default function TaskLoadingIndicator() {
    return (
        <div className="flex w-full flex-col items-center justify-center rounded-md py-4 text-xl ">
            <h2>Preparando tudo</h2>
            <ImSpinner8 className="animate-spin" />
        </div>
    );
}
