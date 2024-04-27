import OtherTasksContainer from "../components/OtherTasksContainer";
import Header from "../components/Header";
import TodayTasksContainer from "../components/TodayTasksContainer";
import { useAuth0 } from "@auth0/auth0-react";
import LoginComponent from "../components/LoginComponent";

export default function Home() {
    const { user } = useAuth0();

    if (user)
        return (
            <div className="w-full min-h-screen flex flex-col lg:h-screen lg:overflow-hidden max-w-[1500px] mx-auto">
                <Header linkPath="/admin" linkText="Gerenciar tarefas" />
                <main className="flex flex-col h-full lg:grid lg:grid-cols-[1.5fr_1fr]">
                    <TodayTasksContainer />
                    <OtherTasksContainer />
                </main>
            </div>
        );

    return <LoginComponent />;
}
