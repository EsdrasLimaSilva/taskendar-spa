import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { EVisualMode, TaskType } from "../lib/features/tasks/tasksSlice";
import { AppStore, RootState, makeStore } from "../lib/store";

// Redux implementation for tests
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: Partial<RootState>;
    store?: AppStore;
}
export function renderWithProviders(
    ui: React.ReactElement,
    extendedRenderOptions: ExtendedRenderOptions = {},
) {
    const {
        preloadedState = {},
        store = makeStore(preloadedState),
        ...renderOptions
    } = extendedRenderOptions;

    const Wrapper = ({ children }: PropsWithChildren) => (
        <Provider store={store}>{children}</Provider>
    );

    return {
        store,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    };
}

/* Data */
export const DummyInitalTestState: RootState = {
    tasks: {
        taskList: {
            today: [],
            others: [],
        },

        currentPage: 1,
        editModal: { visible: false },
        loadingTasks: {
            others: false,
            today: false,
        },
        search: {
            active: false,
            loading: false,
            tasks: [],
        },
        targetEditTask: null,
        userRegistered: true,
        visual: {
            mode: EVisualMode.DAY,
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        },
    },
};

export const dummyTask: TaskType = {
    _id: "123456",
    description: "Task Description",
    uid: "auth0654",
    endsAt: new Date().toISOString(),
    startsAt: new Date().toISOString(),
    title: "Dummy Tittle",
};
