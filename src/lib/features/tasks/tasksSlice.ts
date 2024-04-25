import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TaskType {
    _id: string;
    uid: string;
    title: string;
    description: string;
    startsAt: string; // iso format
    endsAt: string;
}

interface StateType {
    taskList: {
        today: TaskType[];
        others: TaskType[];
    };
    currentPage: number;
}

const initialState: StateType = {
    taskList: {
        today: [],
        others: [],
    },

    currentPage: 1,
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        goToPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export const { goToPage } = tasksSlice.actions;
export const selectTasks = (store: RootState) => store.tasks;
export default tasksSlice.reducer;
