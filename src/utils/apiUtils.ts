import {
    CreateTaskType,
    TaskType,
    UpdateTaskType,
} from "../lib/features/tasks/tasksSlice";
import { ApiResponseType, HolidayResponseType } from "./apiResponseType";

export const BASE_URL = "http://localhost:3333";

async function fetchApi(
    path: string,
    requestInit?: RequestInit,
): Promise<ApiResponseType> {
    const response = await fetch(`${BASE_URL}${path}`, requestInit);
    const apiResponse = response.json();
    return apiResponse;
}

export async function getTasks(
    month: number,
    year: number,
    token: string,
    parameters: { page: number; limit: number } = { page: 1, limit: 20 },
) {
    // mounting query params if exists
    const queryParams = new URLSearchParams();
    parameters.page && queryParams.set("page", String(parameters.page));
    parameters.limit && queryParams.set("limit", String(parameters.limit));

    const apiResponse = await fetchApi("/tasks?" + queryParams.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            month: String(month),
            year: String(year),
        },
    });

    return [...apiResponse.data.tasks];
}

export async function getUserData(token: string) {
    const apiResponse = await fetchApi("/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return apiResponse.ok ? apiResponse.data : null;
}

export async function registerUser(
    username: string,
    token: string,
): Promise<boolean> {
    const apiResponse = await fetchApi("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
    });
    return apiResponse.ok;
}

export async function createTask(
    task: CreateTaskType,
    token: string,
): Promise<TaskType | null> {
    const apiResponse = await fetchApi("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    return apiResponse.data.task;
}

export async function updateTask(
    task: UpdateTaskType,
    token: string,
): Promise<TaskType | null> {
    const apiResponse = await fetchApi("/tasks", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    return apiResponse.data.task;
}

export async function changeTaskDoneState(
    taskId: string,
    done: boolean,
    token: string,
): Promise<boolean> {
    const apiResponse = await fetchApi("/tasks", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId, done }),
    });

    return apiResponse.ok;
}

export async function deleteTask(taskId: string, token: string) {
    const apiResponse = await fetchApi(`/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return apiResponse.ok;
}

export async function searchTasks(
    query: string,
    token: string,
): Promise<TaskType[]> {
    const apiResponse = await fetchApi(`/tasks/search/${query}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const tasks = apiResponse.data.tasks || [];

    return [...tasks];
}

export async function getHolidays(year: number) {
    year = year || new Date().getFullYear();
    const response = await fetch(
        `https://date.nager.at/api/v3/PublicHolidays/${year}/BR`,
    );
    const data: HolidayResponseType = await response.json();

    console.log(data);
}
