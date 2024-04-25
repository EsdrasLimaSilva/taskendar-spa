import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface TaskType {
    id: string;
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
        today: [
            {
                id: "task1",
                title: "Review Project Proposal",
                description:
                    "Read through the project proposal and provide feedback.",
                startsAt: "2024-04-25T13:19:33.281Z",
                endsAt: "2024-07-10T11:00:00.571Z",
            },
            {
                id: "task2",
                title: "Weekly Team Meeting",
                description:
                    "Conduct the weekly team meeting to discuss project progress and goals.",
                startsAt: "2024-04-25T13:20:15.021Z",
                endsAt: "2024-07-12T11:00:00.571Z",
            },
            {
                id: "task3",
                title: "Client Demo Preparation",
                description:
                    "Prepare the demo for the client meeting scheduled for tomorrow.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-06-20T11:00:00.571Z",
            },
            {
                id: "task4",
                title: "Update Project Documentation",
                description:
                    "Review and update project documentation based on recent changes.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-04-29T11:00:00.571Z",
            },
        ],
        others: [
            {
                id: "task5",
                title: "Code Review",
                description:
                    "Conduct a code review for the latest feature implementation.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-04-28T11:00:00.571Z",
            },
            {
                id: "task6",
                title: "Sprint Planning",
                description: "Plan tasks and goals for the upcoming sprint.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-11-12T11:00:00.571Z",
            },
            {
                id: "task7",
                title: "Research New Technologies",
                description:
                    "Explore new technologies for potential integration into the project.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-06-14T11:00:00.571Z",
            },
            {
                id: "task8",
                title: "Team Building Activity",
                description:
                    "Organize a team building activity to strengthen team bonds.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-04-25T11:00:00.571Z",
            },
            {
                id: "task9",
                title: "Bug Fixing",
                description: "Investigate and fix reported bugs in the system.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-04-25T11:00:00.571Z",
            },
            {
                id: "task10",
                title: "Project Review Meeting",
                description:
                    "Conduct a meeting to review project progress and address any issues.",
                startsAt: "2024-04-25T11:00:00.571Z",
                endsAt: "2024-04-25T11:00:00.571Z",
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
