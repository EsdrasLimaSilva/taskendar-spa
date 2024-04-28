import * as auth0 from "@auth0/auth0-react";
import { fireEvent, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import AdminEditTaskCard from "../components/AdminEditTaskCard";
import { TaskType } from "../lib/features/tasks/tasksSlice";
import { renderWithProviders } from "../utils/testUtils";
import { successHandlers } from "./mocks/mockApi";

const server = setupServer(...successHandlers); // creating a server to intercept API requests

vi.mock("@auth0/auth0-react"); // mocking auth 0 so we do not need be authenticated

describe("AdminEditTaskCard", () => {
    const ADMIN_CARD_TEST_ID = "admin-task-card";
    const CONFIRM_TASK_DEL_AREA_TEST_ID = "confirm-task-del-area";
    const CONFIRM_TASK_DEL_BUTTON_TEST_ID = "confirm-task-del-btn";
    const CANCEL_TASK_DEL_BUTTON_TEST_ID = "cancel-task-del-btn";
    const SHOW_CONFIRM_AREA_BTN_TEST_ID = "show-confirmation-area-btn";

    beforeAll(() => server.listen());

    beforeEach(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn(),
        });
        const task: TaskType = {
            _id: "123456",
            description: "Description",
            startsAt: "2024-04-28T13:17:59.986Z",
            endsAt: "2024-04-28T13:17:59.986Z",
            title: "dummy title",
            uid: "Auth0|dkf-dadskjh",
        };
        renderWithProviders(<AdminEditTaskCard task={task} />);
    });

    afterAll(() => server.close());
    afterEach(() => server.resetHandlers(...successHandlers));

    it("Should render correctly", () => {
        expect(screen.getByTestId(ADMIN_CARD_TEST_ID)).toBeInTheDocument();
    });

    it("Should hide the confirmation modal at first", () => {
        expect(screen.getByTestId(CONFIRM_TASK_DEL_AREA_TEST_ID)).toHaveClass(
            "translate-x-full",
        );
    });

    it("Should show the confirmation area when clicked on the trash button", () => {
        const showConfirmAreaBtn = screen.getByTestId(
            SHOW_CONFIRM_AREA_BTN_TEST_ID,
        );

        fireEvent.click(showConfirmAreaBtn);
        expect(screen.getByTestId(CONFIRM_TASK_DEL_AREA_TEST_ID)).toHaveClass(
            "translate-x-0",
        );
    });

    it("should hide when clicking on delete confirmation or cancel btn", () => {
        const showConfirmAreaBtn = screen.getByTestId(
            SHOW_CONFIRM_AREA_BTN_TEST_ID,
        );
        const confirmDelBtn = screen.getByTestId(
            CONFIRM_TASK_DEL_BUTTON_TEST_ID,
        );
        const cancelDelBtn = screen.getByTestId(CANCEL_TASK_DEL_BUTTON_TEST_ID);

        fireEvent.click(showConfirmAreaBtn); // showing the area

        fireEvent.click(cancelDelBtn);
        expect(
            screen.getByTestId(CONFIRM_TASK_DEL_AREA_TEST_ID),
        ).not.toHaveClass("translate-x-0");

        fireEvent.click(showConfirmAreaBtn); // showing the area

        fireEvent.click(confirmDelBtn);
        expect(
            screen.getByTestId(CONFIRM_TASK_DEL_AREA_TEST_ID),
        ).not.toHaveClass("translate-x-0");
    });
});
