import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import LoginComponent from "../components/LoginComponent";
import OtherTasksContainer from "../components/OtherTasksContainer";
import TodayTasksContent from "../components/TodayTasksContent";

export default function Home() {
    const { user } = useAuth0();

    if (user)
        return (
            <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col md:h-screen md:overflow-hidden">
                <Header linkPath="/admin" linkText="Gerenciar tarefas" />
                <main className="flex h-full flex-col md:grid md:grid-cols-[1.5fr_1fr]">
                    <TodayTasksContent />
                    <OtherTasksContainer />
                </main>
            </div>
        );

    return <LoginComponent />;
}
