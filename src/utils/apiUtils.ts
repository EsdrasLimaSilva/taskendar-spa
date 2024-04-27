import {
    CreateTaskType,
    TaskType,
    UpdateTaskType,
} from "../lib/features/tasks/tasksSlice";

const BASE_URL = "http://localhost:3333";

async function fetchApi(path: string, requestInit?: RequestInit) {
    const response = await fetch(`${BASE_URL}${path}`, requestInit);
    const data = response.json();
    return data;
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

    const data = await fetchApi("/tasks?" + queryParams.toString(), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            month: String(month),
            year: String(year),
        },
    });

    return [...data.data.tasks];
}

export async function getUserData(token: string) {
    const data = await fetchApi("/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return data.ok ? data.data : null;
}

export async function registerUser(
    username: string,
    token: string,
): Promise<boolean> {
    const data = await fetchApi("/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
    });
    return data.ok;
}

export async function createTask(
    task: CreateTaskType,
    token: string,
): Promise<TaskType | null> {
    const data = await fetchApi("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    return data.data.task;
}

export async function updateTask(
    task: UpdateTaskType,
    token: string,
): Promise<TaskType | null> {
    const data = await fetchApi("/tasks", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
    });

    return data.data.task;
}
