import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useEffect } from "react";
import { useAppDispatch } from "./lib/hooks";
import { fetchTasks } from "./lib/features/tasks/tasksSlice";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
    const { user } = useAuth0();
    const dispatch = useAppDispatch();

    const getInitialTasks = async () => {
        dispatch(fetchTasks());
    };

    // fetching Initial tasks
    useEffect(() => {
        if (user) getInitialTasks();
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
