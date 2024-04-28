import * as auth0 from "@auth0/auth0-react";
import { fireEvent, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { vi } from "vitest";
import Admin from "../pages/Admin";
import { toStringTimeHHMM, toStringYYYMMDD } from "../utils/dateUtils";
import {
    DummyInitalTestState,
    dummyTask,
    renderWithProviders,
} from "../utils/testUtils";
import { successHandlers } from "./mocks/mockApi";

const server = setupServer(...successHandlers);

vi.mock("@auth0/auth0-react");

describe("Task CRUD", () => {
    const ADMIN_EDIT_MODAL_TEST_ID = "admin-edit-task-modal";
    const ADMIN_CREATE_TASK_BTN_TEST_ID = "admin-create-task-btn";
    // form
    const TASK_TITLE_INPUT_TEST_ID = "input-task-title";
    const TASK_DESCRIPTION_INPUT_TEST_ID = "input-task-description";
    const TASK_STDATE_INPUT_TEST_ID = "input-task-start-date";
    const TASK_STTIME_INPUT_TEST_ID = "input-task-start-time";
    const TASK_NDDATE_INPUT_TEST_ID = "input-task-end-date";
    const TASK_NDTIME_INPUT_TEST_ID = "input-task-end-time";
    const TASK_SUBMIT_INPUT_TEST_ID = "edit-task-modal-submit-btn";
    const EDIT_TASK_CARD_BTN = "edit-task-card-btn";

    beforeAll(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            user: { username: "dummy user" }, // must be setted
            getAccessTokenSilently: vi.fn(),
        });

        server.listen();
    });
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should CREATE a task when submiting the form without a target task", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(
            <BrowserRouter>
                <Admin />
            </BrowserRouter>,
            {
                preloadedState: {
                    tasks: {
                        ...DummyInitalTestState.tasks,
                    },
                },
            },
        );

        const showModalBtn = screen.getByTestId(ADMIN_CREATE_TASK_BTN_TEST_ID);

        fireEvent.click(showModalBtn);

        // getting all inputs
        const titleInput = screen.getByTestId(TASK_TITLE_INPUT_TEST_ID);
        const descriptionInput = screen.getByTestId(
            TASK_DESCRIPTION_INPUT_TEST_ID,
        );
        const stDateInput = screen.getByTestId(TASK_STDATE_INPUT_TEST_ID);
        const stTimeInput = screen.getByTestId(TASK_STTIME_INPUT_TEST_ID);
        const ndDateInput = screen.getByTestId(TASK_NDDATE_INPUT_TEST_ID);
        const ndTimeInput = screen.getByTestId(TASK_NDTIME_INPUT_TEST_ID);

        const newTaskTitle = `My New Task ${uuid()}`;

        // setting up the data
        const task = {
            ...dummyTask,
            title: newTaskTitle,
            startsAt: new Date().toISOString(),
            endsAt: new Date().toISOString(),
        };

        // const getting datetime
        const startDate = new Date(task.startsAt);
        const endDate = new Date(task.endsAt);

        const stDate = toStringYYYMMDD(startDate);
        const stTime = toStringTimeHHMM(startDate);
        const ndDate = toStringYYYMMDD(endDate);
        const ndTime = toStringTimeHHMM(endDate);

        // filling all forms
        fireEvent.change(titleInput, { target: { value: task.title } });
        fireEvent.change(descriptionInput, {
            target: { value: task.description },
        });
        fireEvent.change(stDateInput, { target: { value: stDate } });
        fireEvent.change(stTimeInput, { target: { value: stTime } });
        fireEvent.change(ndDateInput, { target: { value: ndDate } });
        fireEvent.change(ndTimeInput, { target: { value: ndTime } });

        // submiting the form
        const submitButton = screen.getByTestId(TASK_SUBMIT_INPUT_TEST_ID);
        fireEvent.click(submitButton);

        expect(screen.findByText(newTaskTitle)).resolves.toBeInTheDocument();
    });

    it("should UPDATE a task when submiting the form without a target task", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(
            <BrowserRouter>
                <Admin />
            </BrowserRouter>,
            {
                preloadedState: {
                    tasks: {
                        ...DummyInitalTestState.tasks,
                        taskList: {
                            today: [
                                {
                                    ...dummyTask,
                                    title: "Old Title",
                                    startsAt: new Date().toISOString(),
                                    endsAt: new Date().toISOString(),
                                },
                            ],
                            others: [],
                        },
                    },
                },
            },
        );

        const showModalBtn = screen.getByTestId(EDIT_TASK_CARD_BTN);
        fireEvent.click(showModalBtn);

        const newTaskTitle = `task ${uuid()}`;
        // updating title
        fireEvent.change(screen.getByTestId(TASK_TITLE_INPUT_TEST_ID), {
            target: { value: newTaskTitle },
        });

        // submiting the form
        const submitButton = screen.getByTestId(TASK_SUBMIT_INPUT_TEST_ID);
        fireEvent.click(submitButton);

        expect(screen.findByText(newTaskTitle)).resolves.toBeInTheDocument();
    });

    it("should not render the Edit modal at first", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(
            <BrowserRouter>
                <Admin />
            </BrowserRouter>,
            {
                preloadedState: {
                    tasks: {
                        ...DummyInitalTestState.tasks,
                    },
                },
            },
        );

        expect(
            screen.queryByTestId(ADMIN_EDIT_MODAL_TEST_ID),
        ).not.toBeInTheDocument();
    });
});
