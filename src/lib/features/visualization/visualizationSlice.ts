import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../tasks/tasksSlice";
import {
    dateEquals,
    dateIsInInterval,
    getLastDay,
    getMonthName,
    getWeekBoundaries,
    getWeeks,
} from "../../../utils/dateUtils";
import { RootState } from "../../store";

export interface VisualContainerType {
    label: string;
    stDate: string; // iso format
    ndDate: string; // iso format
    tasks: TaskType[];
}

interface StateType {
    mode: "DAY" | "WEEK" | "MONTH";
    modeLabel: string;
    containers: VisualContainerType[];
}

const initialState: StateType = {
    mode: "DAY",
    containers: [],
    modeLabel: "Todos os dias",
};

interface PayloadType {
    year: number;
    month: number;
    tasks: TaskType[];
}

const visualizationSlice = createSlice({
    name: "visualization",
    initialState,
    reducers: {
        setModeToDay(state, action: PayloadAction<PayloadType>) {
            const { year, month, tasks } = action.payload;
            const containers: VisualContainerType[] = [];

            const targetDate = new Date(year, month, 1);

            for (let i = 1; i <= getLastDay(year, month); i++) {
                targetDate.setDate(i);

                containers.push({
                    label: i.toString().padStart(2, "0"),
                    stDate: targetDate.toISOString(),
                    ndDate: targetDate.toISOString(),
                    tasks: tasks.filter((tks) =>
                        dateEquals(new Date(tks.startsAt), targetDate),
                    ),
                });
            }

            state.containers = [...containers];
            state.mode = "DAY";
            state.modeLabel = "Todos os dias";
        },

        setModeToWeek(state, action: PayloadAction<PayloadType>) {
            const { year, month, tasks } = action.payload;
            const containers: VisualContainerType[] = [];

            const weeks = getWeeks(year, month);

            weeks.forEach((week) => {
                const weekBoundaries = getWeekBoundaries(week);
                const weekStartDate = new Date(year, month, weekBoundaries.min);
                const weekEndDate = new Date(year, month, weekBoundaries.max);

                const label = `${weekStartDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}-${weekEndDate
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;

                containers.push({
                    label,
                    stDate: weekStartDate.toISOString(),
                    ndDate: weekEndDate.toISOString(),
                    tasks: tasks.filter((tks) =>
                        dateIsInInterval(
                            new Date(tks.startsAt),
                            weekStartDate,
                            weekEndDate,
                        ),
                    ),
                });
            });

            state.containers = [...containers];
            state.mode = "WEEK";
            state.modeLabel = "Todas as Semanas";
        },

        setModeToMonth(state, action: PayloadAction<PayloadType>) {
            const { year, month, tasks } = action.payload;
            const containers: VisualContainerType[] = [
                {
                    label: getMonthName(month),
                    stDate: new Date(year, month).toISOString(),
                    ndDate: new Date(year, month).toISOString(),
                    tasks: tasks.filter((tks) =>
                        dateIsInInterval(
                            new Date(tks.startsAt),
                            new Date(year, month, 1),
                            new Date(year, month + 1, 0),
                        ),
                    ),
                },
            ];

            state.containers = [...containers];
            state.mode = "MONTH";
            state.modeLabel = "Tarefas do mês";
        },
    },
});
export const { setModeToDay, setModeToWeek, setModeToMonth } =
    visualizationSlice.actions;
export const selectVisualization = (store: RootState) => store.visualization;
export default visualizationSlice.reducer;
