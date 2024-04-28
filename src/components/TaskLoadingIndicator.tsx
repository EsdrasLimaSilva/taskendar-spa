import { ImSpinner8 } from "react-icons/im";

export default function TaskLoadingIndicator() {
    return (
        <div className="text-xl w-full flex flex-col justify-center items-center py-4 rounded-md ">
            <h2>Preparando tudo</h2>
            <ImSpinner8 className="animate-spin" />
        </div>
    );
}
