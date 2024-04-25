import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { TaskType } from "./lib/features/tasks/tasksSlice";
import { useAppDispatch } from "./lib/hooks";
import { useEffect } from "react";
import {
    setModeToDay,
    setModeToMonth,
    setModeToWeek,
} from "./lib/features/visualization/visualizationSlice";

const initialTasks: TaskType[] = [
    {
        _id: "task1",
        uid: "kdaçeunsl-dkaajo",
        title: "Review Project Proposal",
        description: "Read through the project proposal and provide feedback.",
        startsAt: "2024-04-25T13:19:33.281Z",
        endsAt: "2024-07-10T11:00:00.571Z",
    },

    {
        _id: "task2",
        uid: "kdaçeunsl-dkaajo",
        title: "Conclude the project",
        description: "Read through the project proposal and provide feedback.",
        startsAt: "2024-04-25T13:19:33.281Z",
        endsAt: "2024-07-10T11:00:00.571Z",
    },
    {
        _id: "task3",
        uid: "kdaçeunsl-dkaajo",
        title: "Write a book",
        description: "Read through the project proposal and provide feedback.",
        startsAt: "2024-04-27T13:19:33.281Z",
        endsAt: "2024-04-28T11:00:00.571Z",
    },
];

export default function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const currentDate = new Date();
        dispatch(
            setModeToDay({
                year: currentDate.getFullYear(),
                month: currentDate.getMonth(),
                tasks: initialTasks,
            }),
        );
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}
