import Header from "../components/Header";
import TaskDayContainer from "../components/TaskDayContainer";

export default function Home() {
    return (
        <div className="h-screen flex-flex-col">
            <Header linkPath="/admin" linkText="Gerenciar tarefas" />
            <main className="flex flex-col">
                <TaskDayContainer />
            </main>
        </div>
    );
}
