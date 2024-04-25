import OtherTasksContainer from "../components/OtherTasksContainer";
import Header from "../components/Header";
import TodayTasksContainer from "../components/TodayTasksContainer";

export default function Home() {
    return (
        <div className="h-screen flex-flex-col">
            <Header linkPath="/admin" linkText="Gerenciar tarefas" />
            <main className="flex flex-col h-full">
                <TodayTasksContainer />
                <OtherTasksContainer />
            </main>
        </div>
    );
}
