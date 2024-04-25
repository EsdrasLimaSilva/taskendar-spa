import { ButtonHTMLAttributes, FormEvent, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

import {
    EVisualMode,
    TaskType,
    selectTasks,
    setTasks,
    setVisualMode,
} from "../lib/features/tasks/tasksSlice";
import { EMonth } from "../utils/dateUtils";
import { v4 as uuid } from "uuid";

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
    const { visual } = useAppSelector(selectTasks);

    const yearInputRef = useRef<HTMLInputElement>(null);
    const monthInputRef = useRef<HTMLSelectElement>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!yearInputRef.current || !monthInputRef.current) return;

        const year = +yearInputRef.current.value;
        const month = +monthInputRef.current.value;

        const randomTasks: TaskType[] = [];
        for (let i = 0; i < 10; i++) {
            const stDt = new Date(year, month, Math.round(Math.random() * 20));

            randomTasks.push({
                _id: uuid(),
                description: "Random description for task " + (i + 1),
                startsAt: stDt.toISOString(),
                endsAt: new Date(
                    stDt.getFullYear(),
                    stDt.getMonth(),
                    stDt.getDate() + 2,
                ).toISOString(),
                title: "Random title for task " + (i + 1),
                uid: uuid(),
            });
        }

        dispatch(setTasks({ tasks: randomTasks, year, month }));
    };

    return (
        <div className="w-full flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label className="flex flex-col">
                    <span className="text-xl">Ano</span>
                    <input
                        ref={yearInputRef}
                        type="number"
                        defaultValue={visual.year}
                        className="px-4 py-2 text-xl outline-none"
                    />
                </label>

                <select
                    ref={monthInputRef}
                    defaultValue={visual.month}
                    className="bg-neutral-50 text-xl px-4 py-2"
                >
                    <option value={EMonth.JAN}>Janeiro</option>
                    <option value={EMonth.FEB}>Fevereiro</option>
                    <option value={EMonth.MAR}>Março</option>
                    <option value={EMonth.APR}>Abril</option>
                    <option value={EMonth.MAY}>Maio</option>
                    <option value={EMonth.JUN}>Junho</option>
                    <option value={EMonth.JUL}>Julho</option>
                    <option value={EMonth.AUG}>Agosto</option>
                    <option value={EMonth.SEP}>Setembro</option>
                    <option value={EMonth.OCT}>Outubro</option>
                    <option value={EMonth.NOV}>Novembro</option>
                    <option value={EMonth.DEC}>Dezembro</option>
                </select>

                <button
                    type="submit"
                    className="bg-neutral-400 text-neutral-50 text-xl font-bold py-2"
                >
                    buscar tarefas
                </button>
            </form>

            <div className="flex items-center justify-between w-full max-w-[600px] mx-auto">
                <SelectButton
                    label="Dia"
                    disabled={visual.mode == EVisualMode.DAY}
                    onClick={() => dispatch(setVisualMode(EVisualMode.DAY))}
                />
                <SelectButton
                    label="Semana"
                    disabled={visual.mode == EVisualMode.WEEK}
                    onClick={() => dispatch(setVisualMode(EVisualMode.WEEK))}
                />
                <SelectButton
                    label="Mês"
                    disabled={visual.mode == EVisualMode.MONTH}
                    onClick={() => dispatch(setVisualMode(EVisualMode.MONTH))}
                />
            </div>
        </div>
    );
}
