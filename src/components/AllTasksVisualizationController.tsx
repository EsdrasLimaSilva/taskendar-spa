import { ButtonHTMLAttributes, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import {
    selectVisualization,
    setModeToDay,
    setModeToMonth,
    setModeToWeek,
} from "../lib/features/visualization/visualizationSlice";
import { selectTasks } from "../lib/features/tasks/tasksSlice";

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
    const { taskList } = useAppSelector(selectTasks);
    const { mode } = useAppSelector(selectVisualization);
    const dispatch = useAppDispatch();

    return (
        <form className="flex items-center justify-between max-w-[600px] mx-auto">
            <SelectButton
                label="Dia"
                onClick={() =>
                    dispatch(
                        setModeToDay({
                            year: 2024,
                            month: 3,
                            tasks: taskList.others,
                        }),
                    )
                }
                disabled={mode == "DAY"}
            />
            <SelectButton
                label="Semana"
                onClick={() =>
                    dispatch(
                        setModeToWeek({
                            year: 2024,
                            month: 3,
                            tasks: taskList.others,
                        }),
                    )
                }
                disabled={mode == "WEEK"}
            />
            <SelectButton
                label="Mês"
                onClick={() =>
                    dispatch(
                        setModeToMonth({
                            year: 2024,
                            month: 3,
                            tasks: taskList.others,
                        }),
                    )
                }
                disabled={mode == "MONTH"}
            />
        </form>
    );
}
