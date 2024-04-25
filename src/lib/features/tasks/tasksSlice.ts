import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { dateEquals } from "../../../utils/dateUtils";

export interface TaskType {
    _id: string;
    uid: string;
    title: string;
    description: string;
    startsAt: string; // iso format
    endsAt: string;
}

export enum EVisualMode {
    DAY,
    WEEK,
    MONTH,
}

interface VisualType {
    mode: EVisualMode;
    year: number;
    month: number;
}

interface StateType {
    taskList: {
        today: TaskType[];
        others: TaskType[];
    };
    currentPage: number;
    visual: VisualType;
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
    visual: {
        mode: EVisualMode.DAY,
        year: 2024,
        month: 3,
    },
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        goToPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setFullVisual(state, action: PayloadAction<VisualType>) {
            state.visual = { ...action.payload };
        },

        setVisualMode(state, action: PayloadAction<EVisualMode>) {
            state.visual.mode = action.payload;
        },

        setTasks(
            state,
            action: PayloadAction<{
                year: number;
                month: number;
                tasks: TaskType[];
            }>,
        ) {
            const { year, month, tasks } = action.payload;

            const now = new Date();
            const todayTks: TaskType[] = [];
            const otherTks: TaskType[] = [];

            tasks.forEach((tks) => {
                if (dateEquals(now, new Date(tks.startsAt))) todayTks.push(tks);
                else otherTks.push(tks);
            });

            state.visual.year = year;
            state.visual.month = month;
            state.taskList.today = [...todayTks];
            state.taskList.others = [...otherTks];
        },
    },
});

export const { goToPage, setTasks, setVisualMode } = tasksSlice.actions;
export const selectTasks = (store: RootState) => store.tasks;
export default tasksSlice.reducer;
