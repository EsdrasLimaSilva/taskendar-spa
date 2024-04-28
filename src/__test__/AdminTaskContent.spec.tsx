import * as auth0 from "@auth0/auth0-react";
import { setupServer } from "msw/node";
import { vi } from "vitest";
import AdminTaskContent from "../components/AdminTaskContent";
import { DummyInitalTestState, renderWithProviders } from "../utils/testUtils";
import { successHandlers } from "./mocks/mockApi";

const server = setupServer(...successHandlers);

vi.mock("@auth0/auth0-react");

describe("AdminTaskContent", () => {
    beforeAll(() => {
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            getAccessTokenSilently: vi.fn(),
        });
    });

    it("Should render the loading element when loading", () => {
        // rendering the componet wrapped with redux
        renderWithProviders(<AdminTaskContent />, {
            preloadedState: {
                tasks: {
                    ...DummyInitalTestState.tasks,
                },
            },
        });
    });
});
