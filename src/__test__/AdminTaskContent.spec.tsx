import * as auth0 from "@auth0/auth0-react";
import { screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import AdminTaskContent from "../components/AdminTaskContent";
import { DummyInitalTestState, renderWithProviders } from "../utils/testUtils";
import { successHandlers } from "./mocks/mockApi";

const server = setupServer(...successHandlers);

vi.mock("@auth0/auth0-react");

describe("AdminTaskContent", () => {
    const TASK_LOADING_TEST_ID = "task-loading-indicator";
    const ADMIN_OTHER_TASKS_CONTAINER_TEST_ID = "admin-other-tasks-container";
    const ADMIN_TODAY_TASKS_CONTAINER_TEST_ID = "admin-today-tasks-container";

    beforeAll(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn(),
        });
    });

    it("Should render the loading element when preparing", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<AdminTaskContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    loadingTasks: {
                        others: true,
                        today: true,
                    },
                },
            },
        });

        expect(screen.getByTestId(TASK_LOADING_TEST_ID)).toBeInTheDocument();
    });

    it("Should render the loading element when just loading today tasks, showing the other tasks", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<AdminTaskContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    loadingTasks: {
                        others: false,
                        today: true,
                    },
                },
            },
        });

        expect(screen.getByTestId(TASK_LOADING_TEST_ID)).toBeInTheDocument();
        expect(
            screen.getByTestId(ADMIN_OTHER_TASKS_CONTAINER_TEST_ID),
        ).toBeInTheDocument();
    });

    it("Should render the loading element when just loading other tasks, showing the today tasks", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<AdminTaskContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    loadingTasks: {
                        others: true,
                        today: false,
                    },
                },
            },
        });

        expect(screen.getByTestId(TASK_LOADING_TEST_ID)).toBeInTheDocument();
        expect(
            screen.getByTestId(ADMIN_TODAY_TASKS_CONTAINER_TEST_ID),
        ).toBeInTheDocument();
    });
});
