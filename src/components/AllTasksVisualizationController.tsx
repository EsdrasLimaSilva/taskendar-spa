import { ButtonHTMLAttributes, useState } from "react";

interface RadioInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

function SelectButton({ label, ...rest }: RadioInputProps) {
    return (
        <button
            type="button"
            {...rest}
            className="bg-neutral-50 text-neutral-400 px-4 py-2 border-2 flex justify-center items-center rounded-md disabled:bg-neutral-400 disabled:text-neutral-50 flex-grow-[1] max-w-40"
        >
            {label}
        </button>
    );
}

export default function AllTasksVisualizationController() {
    const [visualizationType, setVisualizationType] = useState<"M" | "D" | "W">(
        "D",
    );

    return (
        <form className="flex items-center justify-between max-w-[600px] mx-auto">
            <SelectButton
                label="Dia"
                onClick={() => setVisualizationType("D")}
                disabled={visualizationType == "D"}
            />
            <SelectButton
                label="Semana"
                onClick={() => setVisualizationType("W")}
                disabled={visualizationType == "W"}
            />
            <SelectButton
                label="Mês"
                onClick={() => setVisualizationType("M")}
                disabled={visualizationType == "M"}
            />
        </form>
    );
}
