import * as auth0 from "@auth0/auth0-react";
import { fireEvent, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
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
    // general
    const ADMIN_EDIT_MODAL_TEST_ID = "admin-edit-task-modal";
    const ADMIN_EDIT_CARD_TEST_ID = "admin-task-card";
    const ADMIN_CREATE_TASK_BTN_TEST_ID = "admin-create-task-btn";
    const ADMIN_TODAY_TASK_LIST_CONTAINER = "admin-today-tasks-container";
    const ADMIN_OTHER_TASK_LIST_CONTAINER = "admin-other-tasks-container";
    // form
    const TASK_TITLE_INPUT_TEST_ID = "input-task-title";
    const TASK_DESCRIPTION_INPUT_TEST_ID = "input-task-description";
    const TASK_STDATE_INPUT_TEST_ID = "input-task-start-date";
    const TASK_STTIME_INPUT_TEST_ID = "input-task-start-time";
    const TASK_NDDATE_INPUT_TEST_ID = "input-task-end-date";
    const TASK_NDTIME_INPUT_TEST_ID = "input-task-end-time";
    const TASK_SUBMIT_INPUT_TEST_ID = "edit-task-modal-submit-btn";
    const EDIT_TASK_CARD_BTN = "edit-task-card-btn";
    const TASK_LOADING_INDICATOR_TEST_ID = "task-loading-indicator";
    // search
    const TASK_SEARCH_INPUT_TEST_ID = "task-search-input";
    const TASK_SUBMIT_SEARCH_BTN = "submit-search-btn";
    const SEARCH_TASK_LIST_CONTAINER = "search-task-list-container";
    // actions btn
    const CONFIRM_DEL_TASK_BTN_TEST_ID = "confirm-task-del-btn";

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

        act(() => {
            fireEvent.click(showModalBtn);
        });

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

        act(() => {
            // filling all forms
            fireEvent.change(titleInput, { target: { value: task.title } });
            fireEvent.change(descriptionInput, {
                target: { value: task.description },
            });
            fireEvent.change(stDateInput, { target: { value: stDate } });
            fireEvent.change(stTimeInput, { target: { value: stTime } });
            fireEvent.change(ndDateInput, { target: { value: ndDate } });
            fireEvent.change(ndTimeInput, { target: { value: ndTime } });
        });

        // submiting the form
        const submitButton = screen.getByTestId(TASK_SUBMIT_INPUT_TEST_ID);
        act(() => fireEvent.click(submitButton));

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
        act(() => {
            fireEvent.click(showModalBtn);
        });

        const newTaskTitle = `task ${uuid()}`;
        // submiting the form
        const submitButton = screen.getByTestId(TASK_SUBMIT_INPUT_TEST_ID);

        act(() => {
            // updating title
            fireEvent.change(screen.getByTestId(TASK_TITLE_INPUT_TEST_ID), {
                target: { value: newTaskTitle },
            });
            fireEvent.click(submitButton);
        });

        expect(screen.findByText(newTaskTitle)).resolves.toBeInTheDocument();
    });

    it("should DELETE correctly the task", () => {
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
                                    title: "Task to be deleted",
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

        // should be in the document at first
        expect(screen.getByTestId(ADMIN_EDIT_CARD_TEST_ID)).toBeInTheDocument();

        const confirmDelBtn = screen.getByTestId(CONFIRM_DEL_TASK_BTN_TEST_ID);
        act(() => {
            fireEvent.click(confirmDelBtn);
        });

        // should not to be there when removed
        expect(
            screen.queryByTestId(ADMIN_EDIT_MODAL_TEST_ID),
        ).not.toBeInTheDocument();
    });

    it("Should MOVE from TODAY TASKS to OTHER TASKS when updating the start date to not be today", async () => {
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
        act(() => {
            fireEvent.click(showModalBtn);
        });

        const newTaskTitle = `task ${uuid()}`;
        act(() => {
            // updating title
            fireEvent.change(screen.getByTestId(TASK_TITLE_INPUT_TEST_ID), {
                target: { value: newTaskTitle },
            });
        });

        // getting the date
        const currentDate = new Date();
        const day = currentDate.getDate() === 1 ? 2 : 1;
        currentDate.setDate(day);

        // getting stDate, stTime, ndDate, ndTime
        const stDate = toStringYYYMMDD(currentDate);
        const stTime = toStringTimeHHMM(currentDate);
        const ndDate = toStringYYYMMDD(currentDate);
        const ndTime = toStringTimeHHMM(currentDate);

        // getting inputs
        const stDateInput = screen.getByTestId(TASK_STDATE_INPUT_TEST_ID);
        const stTimeInput = screen.getByTestId(TASK_STTIME_INPUT_TEST_ID);
        const ndDateInput = screen.getByTestId(TASK_NDDATE_INPUT_TEST_ID);
        const ndTimeInput = screen.getByTestId(TASK_NDTIME_INPUT_TEST_ID);

        // submiting the form
        const submitButton = screen.getByTestId(TASK_SUBMIT_INPUT_TEST_ID);
        act(() => {
            // filling form
            fireEvent.change(stDateInput, { target: { value: stDate } });
            fireEvent.change(stTimeInput, { target: { value: stTime } });
            fireEvent.change(ndDateInput, { target: { value: ndDate } });
            fireEvent.change(ndTimeInput, { target: { value: ndTime } });
            // submiting the form
            fireEvent.click(submitButton);
        });

        await screen.findByTestId(ADMIN_EDIT_MODAL_TEST_ID);

        const todayTasksList = await screen.findByTestId(
            ADMIN_TODAY_TASK_LIST_CONTAINER,
        );
        const otherTasksList = await screen.findByTestId(
            ADMIN_OTHER_TASK_LIST_CONTAINER,
        );

        expect(
            todayTasksList.querySelector(".task-card-item"),
        ).not.toBeInTheDocument();

        expect(
            otherTasksList.querySelector(".task-card-item"),
        ).toBeInTheDocument();
    });

    it("Should show all searched taks", () => {
        /*
        !IMPORTANT: The result of this test DEPENDS ON the implementation of the search endpoint in the mockApi!
        */

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

        const searchInput = screen.getByTestId(TASK_SEARCH_INPUT_TEST_ID);
        const submitSearchBtn = screen.getByTestId(TASK_SUBMIT_SEARCH_BTN);

        act(() => {
            // filling the form (MUST be filled even though not used in the mock api)
            fireEvent.change(searchInput, { target: { value: "dummy" } });
            // submiting the form
            fireEvent.click(submitSearchBtn);
        });

        expect(
            screen.findByTestId(SEARCH_TASK_LIST_CONTAINER),
        ).resolves.toBeInTheDocument();
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
