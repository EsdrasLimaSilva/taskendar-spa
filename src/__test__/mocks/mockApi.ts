/**
 * This files implements all handlers that shoudl be used when mocking the
 * api. If this file needs to be changes, it must match all endpoints
 * responses with  api as all tests written was involved into a redux
 * wrapper, therefore, it  calls the api via async thunks
 */

import { HttpResponse, delay, http } from "msw";
import {
    CreateTaskType,
    UpdateTaskType,
} from "../../lib/features/tasks/tasksSlice";
import { ApiResponseType } from "../../utils/apiResponseType";
import { BASE_URL } from "../../utils/apiUtils";
import { dummyTask } from "../../utils/testUtils";

const successHandlers = [
    http.get(`${BASE_URL}/tasks`, async () => {
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

    http.get(`${BASE_URL}/users`, async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {},
            message: "User found",
        };
        return HttpResponse.json(response);
    }),

    http.get(`${BASE_URL}/tasks/search/:query`, async () => {
        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {
                tasks: [{ ...dummyTask }, { ...dummyTask }],
            },
            message: "User found",
        };
        return HttpResponse.json(response);
    }),

    http.post(`${BASE_URL}/tasks`, async ({ request }) => {
        const body = (await request.json()) as CreateTaskType;

        if (!body) throw new Error("Body must be passes as a CreateTaskType");

        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {
                task: { ...body, _id: "123567" },
            },
            message: "Tasks found",
        };
        return HttpResponse.json(response);
    }),

    http.put(`${BASE_URL}/tasks`, async ({ request }) => {
        const body = (await request.json()) as UpdateTaskType;

        if (!body) throw new Error("Body must be passes as a UpdateTaskType");

        await delay(200);
        const response: ApiResponseType = {
            ok: true,
            data: {
                task: {
                    ...body,
                },
            },
            message: "Tasks updated",
        };
        return HttpResponse.json(response);
    }),

    http.delete(`${BASE_URL}/tasks/:taskId`, async () => {
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
