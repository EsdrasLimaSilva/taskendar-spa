import * as auth0 from "@auth0/auth0-react";
import { screen } from "@testing-library/react";
import { vi } from "vitest";
import AdminEditTaskModal from "../components/AdminEditTaskModal";
import { toStringTimeHHMM, toStringYYYMMDD } from "../utils/dateUtils";
import {
    DummyInitalTestState,
    dummyTask,
    renderWithProviders,
} from "../utils/testUtils";

// mocking auth0
vi.mock("@auth0/auth0-react");

describe("AdminEditTaskModal", () => {
    const ADMIN_EDIT_TASK_MODAL_TEST_ID = "admin-edit-task-modal";
    const EDIT_MODAL_TITLE_INPUT_TEST_ID = "input-task-title";
    const EDIT_MODAL_DESC_INPUT_TEST_ID = "input-task-description";
    const EDIT_MODAL_STDATE_INPUT_TEST_ID = "input-task-start-date";
    const EDIT_MODAL_STTIME_INPUT_TEST_ID = "input-task-start-time";
    const EDIT_MODAL_NDDATE_INPUT_TEST_ID = "input-task-end-date";
    const EDIT_MODAL_NDTIME_INPUT_TEST_ID = "input-task-end-time";

    beforeEach(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn(),
        });
    });

    it("should render correctly without a target task id", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<AdminEditTaskModal />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                },
            },
        });
        expect(
            screen.getByTestId(ADMIN_EDIT_TASK_MODAL_TEST_ID),
        ).toBeInTheDocument();

        // getting forms input
        const titleInput = screen.getByTestId(EDIT_MODAL_TITLE_INPUT_TEST_ID);
        const descInput = screen.getByTestId(EDIT_MODAL_DESC_INPUT_TEST_ID);
        const startDateInput = screen.getByTestId(
            EDIT_MODAL_STDATE_INPUT_TEST_ID,
        );
        const startTimeInput = screen.getByTestId(
            EDIT_MODAL_STTIME_INPUT_TEST_ID,
        );
        const endDateInput = screen.getByTestId(
            EDIT_MODAL_NDDATE_INPUT_TEST_ID,
        );
        const endDateTime = screen.getByTestId(EDIT_MODAL_NDTIME_INPUT_TEST_ID);

        const current = new Date();
        const currentDate = toStringYYYMMDD(current);
        const currentTime = toStringTimeHHMM(current);

        expect(titleInput).toHaveValue("");
        expect(descInput).toHaveValue("");
        expect(startDateInput).toHaveValue(currentDate);
        expect(startTimeInput).toHaveValue(currentTime);
        expect(endDateInput).toHaveValue(currentDate);
        expect(endDateTime).toHaveValue(currentTime);
    });

    it("should render correctly with a target task id", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<AdminEditTaskModal />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                    targetEditTask: { ...dummyTask },
                },
            },
        });

        // getting forms input
        const titleInput = screen.getByTestId(EDIT_MODAL_TITLE_INPUT_TEST_ID);
        const descInput = screen.getByTestId(EDIT_MODAL_DESC_INPUT_TEST_ID);
        const startDateInput = screen.getByTestId(
            EDIT_MODAL_STDATE_INPUT_TEST_ID,
        );
        const startTimeInput = screen.getByTestId(
            EDIT_MODAL_STTIME_INPUT_TEST_ID,
        );
        const endDateInput = screen.getByTestId(
            EDIT_MODAL_NDDATE_INPUT_TEST_ID,
        );
        const endDateTime = screen.getByTestId(EDIT_MODAL_NDTIME_INPUT_TEST_ID);

        // unpacking date and time
        const stDate = new Date(dummyTask.startsAt);
        const ndDate = new Date(dummyTask.endsAt);

        const startDate = toStringYYYMMDD(stDate);
        const startTime = toStringTimeHHMM(stDate);
        const endDate = toStringYYYMMDD(ndDate);
        const endTime = toStringTimeHHMM(ndDate);

        expect(titleInput).toHaveValue(dummyTask.title);
        expect(descInput).toHaveValue(dummyTask.description);
        expect(startDateInput).toHaveValue(startDate);
        expect(startTimeInput).toHaveValue(startTime);
        expect(endDateInput).toHaveValue(endDate);
        expect(endDateTime).toHaveValue(endTime);
    });
});
