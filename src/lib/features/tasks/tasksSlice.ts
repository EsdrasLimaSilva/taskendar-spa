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
        others: [
            {
                _id: "task1",
                uid: "kdaçeunsl-dkaajo",
                title: "Review Project Proposal",
                description:
                    "Read through the project proposal and provide feedback.",
                startsAt: "2024-04-25T13:19:33.281Z",
                endsAt: "2024-07-10T11:00:00.571Z",
            },

            {
                _id: "task2",
                uid: "kdaçeunsl-dkaajo",
                title: "Conclude the project",
                description:
                    "Read through the project proposal and provide feedback.",
                startsAt: "2024-04-25T13:19:33.281Z",
                endsAt: "2024-07-10T11:00:00.571Z",
            },
            {
                _id: "task3",
                uid: "kdaçeunsl-dkaajo",
                title: "Write a book",
                description:
                    "Read through the project proposal and provide feedback.",
                startsAt: "2024-04-27T13:19:33.281Z",
                endsAt: "2024-04-28T11:00:00.571Z",
            },
        ],
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
