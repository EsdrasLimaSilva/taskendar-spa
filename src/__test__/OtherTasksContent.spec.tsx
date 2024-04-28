import * as auth0 from "@auth0/auth0-react";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import OtherTasksContent from "../components/OtherTasksContent";
import { EVisualMode } from "../lib/features/tasks/tasksSlice";
import { EMonth } from "../utils/dateUtils";
import { DummyInitalTestState, renderWithProviders } from "../utils/testUtils";

vi.mock("@auth0/auth0-react");

describe("OtherTasksContent", () => {
    const OTHER_TASK_CONTENT_TEST_ID = "other-tasks-content";

    beforeAll(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn(),
        });
    });

    it("should render correctly all days when rendered in DAY mode", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<OtherTasksContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                },
            },
        });

        expect(
            screen
                .getByTestId(OTHER_TASK_CONTENT_TEST_ID)
                .querySelectorAll(".visual-card-item").length,
        ).toBeGreaterThanOrEqual(28);
    });

    it("should render correctly all days when rendered in WEEK mode", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<OtherTasksContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    visual: {
                        mode: EVisualMode.WEEK,
                        month: EMonth.FEB,
                        year: new Date().getFullYear(),
                    },
                },
            },
        });

        expect(
            screen
                .getByTestId(OTHER_TASK_CONTENT_TEST_ID)
                .querySelectorAll(".visual-card-item").length,
        ).toBeGreaterThanOrEqual(4);
    });

    it("should render correctly all days when rendered in MONTH mode", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<OtherTasksContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    visual: {
                        mode: EVisualMode.MONTH,
                        month: EMonth.FEB,
                        year: new Date().getFullYear(),
                    },
                },
            },
        });

        expect(
            screen
                .getByTestId(OTHER_TASK_CONTENT_TEST_ID)
                .querySelectorAll(".visual-card-item").length,
        ).toBe(1);
    });
});
