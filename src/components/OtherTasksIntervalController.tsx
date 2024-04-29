import { useAuth0 } from "@auth0/auth0-react";
import { FormEvent, useRef } from "react";
import {
    EVisualMode,
    fetchOtherTasksThunk,
    selectTasks,
    setOtherVisualization,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { EMonth } from "../utils/dateUtils";

export default function OtherTasksIntervalController() {
    const { getAccessTokenSilently } = useAuth0();
    const { visual } = useAppSelector(selectTasks);
    const yearInputRef = useRef<HTMLInputElement>(null);
    const monthInputRef = useRef<HTMLSelectElement>(null);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!yearInputRef.current || !monthInputRef.current) return;

        const year = +yearInputRef.current.value;
        const month = +monthInputRef.current.value;

        const token = await getAccessTokenSilently();
        const targetDate = new Date(year, month);

        dispatch(fetchOtherTasksThunk({ targetDate, token }));
        dispatch(setOtherVisualization({ mode: EVisualMode.DAY, year, month }));
    };

    return (
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
                className="bg-neutral-50 px-4 py-2 text-xl"
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
                className="bg-primary-500 py-2 text-xl font-bold text-neutral-50"
            >
                buscar tarefas
            </button>
        </form>
    );
}
