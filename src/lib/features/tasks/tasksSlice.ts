import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    changeTaskDoneState,
    createTask,
    deleteTask,
    getTasks,
    searchTasks,
    updateTask,
} from "../../../utils/apiUtils";
import { dateIsInThisMonth, dateIsToday } from "../../../utils/dateUtils";
import { RootState } from "../../store";

/*============ Types ============*/
export interface CreateTaskType {
    title: string;
    description: string;
    startsAt: string;
    endsAt: string;
    done: boolean;
}

export interface UpdateTaskType extends CreateTaskType {
    _id: string;
}

export interface TaskType extends CreateTaskType {
    _id: string;
    uid: string;
    isHoliday: boolean;
    holidayName: string | null;
}

export enum ETaskStateStatus {
    IDLE,
    LOADING_TODAY,
    LOADING_OTHERS,
    LOADING_UPDATE,
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
    search: {
        active: boolean;
        loading: boolean;
        tasks: TaskType[];
    };
    loadingTasks: {
        today: boolean;
        others: boolean;
    };

    updatingTaskDoneState: {
        taskId: string;
        loading: boolean;
    };
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

    search: {
        active: false,
        loading: false,
        tasks: [],
    },

    loadingTasks: {
        today: true,
        others: true,
    },

    updatingTaskDoneState: {
        taskId: "",
        loading: false,
    },
};
/*============ Async Thunks ============*/

export const fetchTodayTasksThunk = createAsyncThunk(
    "tasks/fetchTodayTasks",
    async (token: string) => {
        const date = new Date();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const tasks: TaskType[] = await getTasks(month, year, token);
        return tasks;
    },
);

// get all tasks that are not for today
export const fetchOtherTasksThunk = createAsyncThunk(
    "tasks/fetchOtherTasks",
    async ({ targetDate, token }: { targetDate?: Date; token: string }) => {
        const otherDate = new Date();

        const date = targetDate || otherDate;
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const tasks: TaskType[] = await getTasks(month, year, token);
        return tasks;
    },
);

// searhc tasks by query
export const searchTasksQueryThunk = createAsyncThunk(
    "tasks/searchTasks",
    async ({ query, token }: { query: string; token: string }) => {
        const tasks = await searchTasks(query, token);
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

export const updateTaskDoneStateThunk = createAsyncThunk(
    "tasks/updateTaskDoneState",
    async ({
        taskId,
        done,
        token,
    }: {
        taskId: string;
        done: boolean;
        token: string;
    }) => {
        const taskWasUpdated = await changeTaskDoneState(taskId, done, token);
        return taskWasUpdated;
    },
);

export const deleteTaskThunk = createAsyncThunk(
    "tasks/deleteTask",
    async ({ taskId, token }: { taskId: string; token: string }) => {
        const taskWasDeleted = await deleteTask(taskId, token);
        return { ok: taskWasDeleted, taskId };
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

        goToPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },

        setFullVisual(state, action: PayloadAction<VisualType>) {
            state.visual = { ...action.payload };
        },

        setOtherVisualization(
            state,
            action: PayloadAction<{
                mode: EVisualMode;
                year?: number;
                month?: number;
            }>,
        ) {
            const { mode, year, month } = action.payload;
            state.visual.mode = mode;
            state.visual.year = year || state.visual.year;
            state.visual.month = month || state.visual.month;
        },

        setTargetEditTask(state, action: PayloadAction<string>) {
            const tasks = state.search.active
                ? [...state.search.tasks]
                : [...state.taskList.today, ...state.taskList.others];

            const taskTarget = tasks.find((tsk) => tsk._id === action.payload);
            state.targetEditTask = taskTarget || null;
        },

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

        setSearchActive(state, action: PayloadAction<boolean>) {
            state.search.active = action.payload;
        },
    },

    extraReducers: (builder) => {
        /* ================================================================ */
        /* =========================== Pending ============================ */

        builder.addCase(searchTasksQueryThunk.pending, (state) => {
            state.search.loading = true;
            state.search.active = true;
        });

        builder.addCase(fetchTodayTasksThunk.pending, (state) => {
            state.loadingTasks.today = true;
        });

        builder.addCase(fetchOtherTasksThunk.pending, (state) => {
            state.loadingTasks.others = true;
        });

        builder.addCase(createTaskThunk.pending, (state) => {
            state.loadingTasks.today = true;
            state.loadingTasks.others = true;
        });

        builder.addCase(updateTaskThunk.pending, (state) => {
            state.loadingTasks.today = true;
            state.loadingTasks.others = true;
        });

        builder.addCase(updateTaskDoneStateThunk.pending, (state, { meta }) => {
            state.updatingTaskDoneState.loading = true;
            state.updatingTaskDoneState.taskId = meta.arg.taskId;
        });

        builder.addCase(deleteTaskThunk.pending, (state) => {
            state.loadingTasks.today = true;
            state.loadingTasks.others = true;
        });

        /* ================================================================ */
        /* ========================= Fullfield ============================ */

        // handle today tasks fetching
        builder.addCase(fetchTodayTasksThunk.fulfilled, (state, action) => {
            const tasks = action.payload;
            state.taskList.today = tasks.filter((tsk) =>
                dateIsToday(new Date(tsk.startsAt)),
            );
            state.loadingTasks.today = false;
        });

        // handle other tasks fetching
        builder.addCase(fetchOtherTasksThunk.fulfilled, (state, action) => {
            const tasks = action.payload;
            state.taskList.others = tasks.filter(
                (tsk) => !dateIsToday(new Date(tsk.startsAt)),
            );
            state.loadingTasks.others = false;
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

            state.loadingTasks.today = false;
            state.loadingTasks.others = false;
        });
        // update task
        builder.addCase(updateTaskThunk.fulfilled, (state, action) => {
            const updatedTask = action.payload!;

            // removing from tasks because before the update maybe the task was on another part(today or other)
            state.taskList.today = state.taskList.today.filter(
                (tsk) => tsk._id !== updatedTask._id,
            );
            state.taskList.others = state.taskList.others.filter(
                (tsk) => tsk._id !== updatedTask._id,
            );
            state.search.tasks = state.search.tasks.filter(
                (tsk) => tsk._id !== updatedTask._id,
            );

            if (updatedTask) {
                if (state.search.active) {
                    state.search.tasks.push(updatedTask);
                } else if (dateIsToday(new Date(updatedTask.startsAt!))) {
                    state.taskList.today.push(updatedTask);
                } else if (dateIsInThisMonth(new Date(updatedTask.startsAt))) {
                    state.taskList.others.push(updatedTask);
                }
            }

            state.loadingTasks.today = false;
            state.loadingTasks.others = false;
        });

        builder.addCase(
            updateTaskDoneStateThunk.fulfilled,
            (state, { meta, payload }) => {
                const taskWasUpdated = payload;

                if (taskWasUpdated) {
                    const tskIndexToday = state.taskList.today.findIndex(
                        (tsk) => tsk._id === meta.arg.taskId,
                    );
                    const tskIndexOther = state.taskList.others.findIndex(
                        (tsk) => tsk._id === meta.arg.taskId,
                    );
                    const tskIndexSearch = state.search.tasks.findIndex(
                        (tsk) => tsk._id === meta.arg.taskId,
                    );

                    if (tskIndexToday >= 0) {
                        state.taskList.today[tskIndexToday].done =
                            meta.arg.done;
                    } else if (tskIndexOther >= 0) {
                        state.taskList.others[tskIndexOther].done =
                            meta.arg.done;
                    } else if (tskIndexSearch >= 0) {
                        state.taskList.today[tskIndexSearch].done =
                            meta.arg.done;
                    }
                }

                state.updatingTaskDoneState.loading = false;
                state.updatingTaskDoneState.taskId = "";
            },
        );

        // delete task
        builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
            const { ok, taskId } = action.payload;

            if (ok) {
                state.taskList.today = state.taskList.today.filter(
                    (tsk) => tsk._id !== taskId,
                );
                state.taskList.others = state.taskList.others.filter(
                    (tsk) => tsk._id !== taskId,
                );
            }

            state.loadingTasks.today = false;
            state.loadingTasks.others = false;
        });

        // searching tasks
        builder.addCase(searchTasksQueryThunk.fulfilled, (state, action) => {
            const tasks = action.payload;
            state.search.tasks = [...tasks];
            state.search.loading = false;
        });
    },
});

export const {
    goToPage,
    setTasks,
    setOtherVisualization,
    setTargetEditTask,
    setEditModalVisible,
    setEditModalHidden,
    setFullVisual,
    setUserRegistered,
    setSearchActive,
} = tasksSlice.actions;
export const selectTasks = (store: RootState) => store.tasks;
export default tasksSlice.reducer;
