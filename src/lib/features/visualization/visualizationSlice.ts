import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../tasks/tasksSlice";
import { dateEquals, getLastDay } from "../../../utils/dateUtils";
import { RootState } from "../../store";

export interface VisualContainerType {
    label: string;
    stDate: string; // iso format
    ndDate: string; // iso format
    tasks: TaskType[];
}

interface StateType {
    mode: "DAY" | "WEEK" | "MONTH";
    containers: VisualContainerType[];
}

const initialState: StateType = {
    mode: "DAY",
    containers: [],
};

const visualizationSlice = createSlice({
    name: "visualization",
    initialState,
    reducers: {
        setModeToDay(
            state,
            action: PayloadAction<{
                year: number;
                month: number;
                tasks: TaskType[];
            }>,
        ) {
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
        },
    },
});
export const { setModeToDay } = visualizationSlice.actions;
export const selectVisualization = (store: RootState) => store.visualization;
export default visualizationSlice.reducer;
