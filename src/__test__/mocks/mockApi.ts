/**
 * This files implements all handlers that shoudl be used when mocking the
 * api. If this file needs to be changes, it must match all endpoints
 * responses with  api as all tests written was involved into a redux
 * wrapper, therefore, it  calls the api via async thunks
 */

import { HttpResponse, delay, http } from "msw";
import { ApiResponseType } from "../../utils/apiResponseType";
import { dummyTask } from "../../utils/testUtils";

const successHandlers = [
    http.get("/tasks", async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {
                tasks: [{ ...dummyTask }],
            },
            message: "Tasks found",
        };
        return HttpResponse.json(response);
    }),

    http.get("/users", async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {},
            message: "User found",
        };
        return HttpResponse.json(response);
    }),

    http.post("/tasks", async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {
                task: [{ ...dummyTask }],
            },
            message: "Tasks found",
        };
        return HttpResponse.json(response);
    }),

    http.put("/tasks", async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {
                task: [{ ...dummyTask }],
            },
            message: "Tasks updated",
        };
        return HttpResponse.json(response);
    }),

    http.delete("/tasks/:taskId", async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {},
            message: "Task was deleted",
        };
        return HttpResponse.json(response);
    }),
];

export { successHandlers };
