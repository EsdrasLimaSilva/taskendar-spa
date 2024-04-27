import OtherTasksContainer from "../components/OtherTasksContainer";
import Header from "../components/Header";
import TodayTasksContainer from "../components/TodayTasksContainer";
import { useAuth0 } from "@auth0/auth0-react";
import LoginComponent from "../components/LoginComponent";
import LoadingComponent from "../components/LoadingComponent";

export default function Home() {
    const { user, isLoading } = useAuth0();

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
