import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counteSlice";
import tasksReducer from "./features/tasks/tasksSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            tasks: tasksReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
