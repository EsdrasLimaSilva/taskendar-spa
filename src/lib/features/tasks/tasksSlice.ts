import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TaskType {
    title: string;
    description: string;
    startsAt: Date;
    endsAt: Date;
}

interface StateType {
    taskList: TaskType[];
}

const initialState: StateType = {
    taskList: [],
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
});

export const {} = tasksSlice.actions;
export const selectTasks = (store: RootState) => store.tasks;
export default tasksSlice.reducer;
