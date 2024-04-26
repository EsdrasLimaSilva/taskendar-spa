import OtherTasksContainer from "../components/OtherTasksContainer";
import Header from "../components/Header";
import TodayTasksContainer from "../components/TodayTasksContainer";
import { useAuth0 } from "@auth0/auth0-react";
import LoginComponent from "../components/LoginComponent";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";
import LoadingComponent from "../components/LoadingComponent";

export default function Home() {
    const { user, getAccessTokenSilently, isAuthenticated, isLoading } =
        useAuth0();

    const func = async () => {
        if (!isAuthenticated) {
            return;
        }

        const token = await getAccessTokenSilently({
            authorizationParams: {
                scope: "read:current_user",
            },
        });

        console.log(token);
    };

    useEffect(() => {
        func();
    }, [isAuthenticated]);

    if (isLoading) return <LoadingComponent />;

    if (user)
        return (
            <div className="h-screen flex-flex-col">
                <Header linkPath="/admin" linkText="Gerenciar tarefas" />
                <main className="flex flex-col h-full">
                    <TodayTasksContainer />
                    <OtherTasksContainer />
                </main>
            </div>
        );

    return <LoginComponent />;
}
