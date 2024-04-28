import { combineReducers, configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./features/tasks/tasksSlice";

const rootReducer = combineReducers({
    tasks: tasksReducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
