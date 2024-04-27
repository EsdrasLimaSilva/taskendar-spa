import { ButtonHTMLAttributes, FormEvent, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

import {
    EVisualMode,
    fetchOtherTasksThunk,
    selectTasks,
    setOtherVisualization,
} from "../lib/features/tasks/tasksSlice";
import { EMonth } from "../utils/dateUtils";
import { useAuth0 } from "@auth0/auth0-react";
import OtherTasksIntervalController from "./OtherTasksIntervalController";

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

/*=====================================================================*/

export default function AllTasksVisualizationController() {
    const { visual } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    return (
        <div className="w-full flex flex-col gap-8">
            <OtherTasksIntervalController />

            <div className="flex items-center justify-between w-full max-w-[600px] mx-auto">
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
