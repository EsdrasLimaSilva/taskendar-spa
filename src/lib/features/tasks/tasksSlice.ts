import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { dateEquals } from "../../../utils/dateUtils";
import { v4 as uuid } from "uuid";

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
    targetEditTask: TaskType | null;
    editModal: {
        visible: boolean;
    };
}

// async thunk to get tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // creating randomized tasks
    const randomTasks: TaskType[] = [];
    for (let i = 0; i < 10; i++) {
        let stDt = new Date(year, month, Math.round(Math.random() * 20));

        if (i < 3) stDt = new Date();

        randomTasks.push({
            _id: uuid(),
            description: "Random description for task " + (i + 1),
            startsAt: stDt.toISOString(),
            endsAt: new Date(
                stDt.getFullYear(),
                stDt.getMonth(),
                stDt.getDate() + Math.round(Math.random() * 2) + 1,
            ).toISOString(),
            title: "Random title for task " + (i + 1),
            uid: uuid(),
        });
    }

    return randomTasks;
});

const initialState: StateType = {
    taskList: {
        today: [],
        others: [],
    },

    currentPage: 1,
    visual: {
        mode: EVisualMode.DAY,
        year: 2024,
        month: 3,
    },

    targetEditTask: null,
    editModal: {
        visible: false,
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

        setTargetEditTask(state, action: PayloadAction<string>) {
            const taskTarget = [
                ...state.taskList.today,
                ...state.taskList.others,
            ].find((tsk) => tsk._id === action.payload);

            state.targetEditTask = taskTarget || null;
        },

        setTaskInfo(state, action: PayloadAction<{ task: TaskType }>) {},

        setEditModalVisible(state) {
            state.editModal.visible = true;
        },

        setEditModalHidden(state) {
            state.editModal.visible = false;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            const allTasks = [...action.payload];
            const currentDate = new Date();
            const todayTks: TaskType[] = [];
            const otherTks: TaskType[] = [];

            // organizing all tasks into today and others
            allTasks.forEach((tsk) => {
                if (dateEquals(currentDate, new Date(tsk.startsAt)))
                    todayTks.push(tsk);
                else otherTks.push(tsk);
            });

            state.visual.year = currentDate.getFullYear();
            state.visual.month = currentDate.getMonth();
            state.taskList.today = [...todayTks];
            state.taskList.others = [...otherTks];
        });
    },
});

export const {
    goToPage,
    setTasks,
    setVisualMode,
    setTaskInfo,
    setTargetEditTask,
    setEditModalVisible,
    setEditModalHidden,
    setFullVisual,
} = tasksSlice.actions;
export const selectTasks = (store: RootState) => store.tasks;
export default tasksSlice.reducer;
