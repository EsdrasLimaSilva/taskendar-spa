import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { dateIsToday } from "../../../utils/dateUtils";
import { createTask, getTasks, updateTask } from "../../../utils/apiUtils";

/*============ Types ============*/
export interface CreateTaskType {
    title: string;
    description: string;
    startsAt: string;
    endsAt: string;
}

export interface UpdateTaskType extends CreateTaskType {
    _id: string;
}

export interface TaskType extends CreateTaskType {
    _id: string;
    uid: string;
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
    userRegistered: boolean;
}

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

    userRegistered: false,
};
/*============ Async Thunks ============*/
// async thunk to get tasks
export const fetchTasks = createAsyncThunk(
    "tasks/fetchTasks",
    async (token: string) => {
        const tasks: TaskType[] = await getTasks(token);
        return tasks;
    },
);

// async think to create a task
export const createTaskThunk = createAsyncThunk(
    "tasks/createTask",
    async ({ task, token }: { task: CreateTaskType; token: string }) => {
        const createdTask = await createTask(task, token);
        return createdTask;
    },
);

export const updateTaskThunk = createAsyncThunk(
    "tasks/updateTask",
    async ({ task, token }: { task: UpdateTaskType; token: string }) => {
        const updatedTask = await updateTask(task, token);
        return updatedTask;
    },
);

/*============ Slice ============*/
const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks(
            state,
            action: PayloadAction<{
                year: number;
                month: number;
                tasks: TaskType[];
            }>,
        ) {
            const { year, month, tasks } = action.payload;

            const todayTks: TaskType[] = [];
            const otherTks: TaskType[] = [];

            tasks.forEach((tks) => {
                if (dateIsToday(new Date(tks.startsAt))) {
                    todayTks.push(tks);
                } else otherTks.push(tks);
            });

            state.visual.year = year;
            state.visual.month = month;
            state.taskList.today = [...todayTks];
            state.taskList.others = [...otherTks];
        },

        setNewTask(state, action: PayloadAction<TaskType>) {},

        goToPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setFullVisual(state, action: PayloadAction<VisualType>) {
            state.visual = { ...action.payload };
        },

        setVisualMode(state, action: PayloadAction<EVisualMode>) {
            state.visual.mode = action.payload;
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
            document.body.style.overflow = "hidden";
        },

        setEditModalHidden(state) {
            state.editModal.visible = false;
            document.body.style.overflow = "auto";
        },

        setUserRegistered(state, action: PayloadAction<boolean>) {
            state.userRegistered = action.payload;
        },
    },

    extraReducers: (builder) => {
        // fetch tasks
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            const allTasks = [...action.payload]; // retrieved via async thunk
            const currentDate = new Date();
            const todayTks: TaskType[] = [];
            const otherTks: TaskType[] = [];

            // organizing all tasks into today and others
            allTasks.forEach((tsk) => {
                if (dateIsToday(new Date(tsk.startsAt))) todayTks.push(tsk);
                else otherTks.push(tsk);
            });

            state.visual.year = currentDate.getFullYear();
            state.visual.month = currentDate.getMonth();
            state.taskList.today = [...todayTks];
            state.taskList.others = [...otherTks];
        });

        //create task
        builder.addCase(createTaskThunk.fulfilled, (state, action) => {
            const createdTask = action.payload;

            if (createdTask) {
                if (dateIsToday(new Date(createdTask?.startsAt!))) {
                    state.taskList.today.push(createdTask);
                } else {
                    state.taskList.others.push(createdTask);
                }
            }
        });
        // update task
        builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            if (updatedTask) {
                if (dateIsToday(new Date(updatedTask?.startsAt!))) {
                    const taskIndex = state.taskList.today.findIndex(
                        (task) => task._id === updatedTask._id,
                    );
                    state.taskList.today[taskIndex] = updatedTask;
                } else {
                    const taskIndex = state.taskList.others.findIndex(
                        (task) => task._id === updatedTask._id,
                    );
                    state.taskList.others[taskIndex] = updatedTask;
                }
            }
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
    setNewTask,
    setUserRegistered,
} = tasksSlice.actions;
export const selectTasks = (store: RootState) => store.tasks;
export default tasksSlice.reducer;
