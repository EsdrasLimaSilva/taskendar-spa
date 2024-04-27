import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import {
    fetchTasksThunk,
    selectTasks,
    setUserRegistered,
} from "./lib/features/tasks/tasksSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { getTasks, getUserData, registerUser } from "./utils/apiUtils";
import LoadingComponent from "./components/LoadingComponent";

export default function App() {
    const { user: authUser, isLoading, getAccessTokenSilently } = useAuth0();
    const { userRegistered } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    const getUserInfo = async () => {
        const token = await getAccessTokenSilently();

        // trying to retrieve user data
        const user = await getUserData(token);

        if (!user) {
            // creating a new user
            const registered = await registerUser(
                authUser!.nickname || `User${Math.ceil(Math.random() * 120)}`,
                token,
            );

            if (!registered) alert("Não foi possível registrar você");
        }

        if (user) {
            dispatch(fetchTasksThunk({ token }));
            dispatch(setUserRegistered(true));
        }
    };

    const setInitialSate = async () => {
        await getUserInfo();
    };

    // fetching Initial tasks
    useEffect(() => {
        if (authUser) {
            setInitialSate();
        }
    }, [authUser]);

    if (isLoading || !userRegistered) return <LoadingComponent />;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}
