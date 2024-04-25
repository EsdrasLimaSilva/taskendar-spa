import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counteSlice";
import tasksReducer from "./features/tasks/tasksSlice";
import visualizationReducer from "./features/visualization/visualizationSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            tasks: tasksReducer,
            visualization: visualizationReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
