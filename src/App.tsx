import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingComponent from "./components/LoadingComponent";
import LoginComponent from "./components/LoginComponent";
import {
    fetchOtherTasksThunk,
    fetchTodayTasksThunk,
    selectTasks,
    setUserRegistered,
} from "./lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "./lib/hooks";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import { getUserData, registerUser } from "./utils/apiUtils";

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
            dispatch(fetchTodayTasksThunk(token));
            dispatch(fetchOtherTasksThunk({ token }));
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

    if (isLoading)
        return (
            <LoadingComponent>
                <h2 className="animate-pulse italic">Tentando authenticar</h2>
            </LoadingComponent>
        );
    if (!authUser) return <LoginComponent />;
    if (!userRegistered)
        return (
            <main className="flex h-screen items-center justify-center px-2">
                <p className="text-center text-lg">
                    Aguarde um pouco, estamos preparando tudo. Se essa página
                    demorar muito tempo ou não mudar, alguma coisa deu errado.
                    Verifique se Auth0 está configurado corretamente e a
                    aplicação backend está functionando.
                </p>
            </main>
        );

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    );
}
