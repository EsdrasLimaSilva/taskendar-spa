import { ButtonHTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

import {
    EVisualMode,
    selectTasks,
    setOtherVisualization,
} from "../lib/features/tasks/tasksSlice";
import OtherTasksIntervalController from "./OtherTasksIntervalController";

interface RadioInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

function SelectButton({ label, ...rest }: RadioInputProps) {
    return (
        <button
            type="button"
            {...rest}
            className="disabled:bg-primary-600 flex max-w-40 flex-grow-[1] items-center justify-center rounded-md border-2 bg-neutral-50 px-4 py-2 text-neutral-400 disabled:font-bold disabled:text-neutral-50"
        >
            {label}
        </button>
    );
}

/*=====================================================================*/

export default function AllTasksVisualizationController() {
    const { visual } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    return (
        <div className="flex w-full flex-col gap-8">
            <OtherTasksIntervalController />

            <div className="mx-auto flex w-full max-w-[600px] items-center justify-between">
                <SelectButton
                    label="Dia"
                    disabled={visual.mode == EVisualMode.DAY}
                    onClick={() =>
                        dispatch(
                            setOtherVisualization({ mode: EVisualMode.DAY }),
                        )
                    }
                />
                <SelectButton
                    label="Semana"
                    disabled={visual.mode == EVisualMode.WEEK}
                    onClick={() =>
                        dispatch(
                            setOtherVisualization({ mode: EVisualMode.WEEK }),
                        )
                    }
                />
                <SelectButton
                    label="Mês"
                    disabled={visual.mode == EVisualMode.MONTH}
                    onClick={() =>
                        dispatch(
                            setOtherVisualization({ mode: EVisualMode.MONTH }),
                        )
                    }
                />
            </div>
        </div>
    );
}
