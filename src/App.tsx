import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { fetchTasks } from "./lib/features/tasks/tasksSlice";

export default function App() {
    const dispatch = useAppDispatch();

    const getInitialTasks = async () => {
        dispatch(fetchTasks());
    };

    // fetching Initial tasks
    useEffect(() => {
        getInitialTasks();
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
