import { ImSpinner8 } from "react-icons/im";

interface Props {
    empty?: boolean;
}

export default function TaskLoadingIndicator({ empty }: Props) {
    return (
        <div
            data-testid="task-loading-indicator"
            className="flex w-full flex-col items-center justify-center rounded-md py-4 text-xl "
        >
            {empty ? "" : <h2>Preparando tudo</h2>}
            <ImSpinner8 className="animate-spin" />
        </div>
    );
}
