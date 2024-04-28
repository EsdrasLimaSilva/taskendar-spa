import * as auth0 from "@auth0/auth0-react";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import TodayTasksContent from "../components/TodayTasksContent";
import {
    DummyInitalTestState,
    dummyTask,
    renderWithProviders,
} from "../utils/testUtils";

vi.mock("@auth0/auth0-react");

describe("TodayTasksContent", () => {
    const TODAY_TASKS_CONTENT_TEST_ID = "today-tasks-content";
    const TASK_LOADING_INDICATOR_TEST_ID = "task-loading-indicator";
    const WARNING_EMPTY_TASKS_TEST_ID = "empty-tasks-warning";

    beforeAll(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn(),
        });
    });

    it("should render correctly the today task", () => {
        renderWithProviders(<TodayTasksContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    taskList: {
                        today: [{ ...dummyTask }],
                        others: [],
                    },
                },
            },
        });

        expect(
            screen
                .getByTestId(TODAY_TASKS_CONTENT_TEST_ID)
                .querySelector(".task-card"),
        ).toBeInTheDocument();
    });

    it("should render the loading when fetching today tasks", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<TodayTasksContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    loadingTasks: {
                        today: true,
                        others: false,
                    },
                },
            },
        });

        expect(
            screen.getByTestId(TASK_LOADING_INDICATOR_TEST_ID),
        ).toBeInTheDocument();
    });

    it("should render the warning when there is no today tasks", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<TodayTasksContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                },
            },
        });

        expect(
            screen.getByTestId(WARNING_EMPTY_TASKS_TEST_ID),
        ).toBeInTheDocument();
    });
});
