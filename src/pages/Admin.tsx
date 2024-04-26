import AdminTaskContainer from "../components/AdminTaskContainer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { selectTasks } from "../lib/features/tasks/tasksSlice";
import { useAppSelector } from "../lib/hooks";

export default function Admin() {
    const { taskList } = useAppSelector(selectTasks);

    const handleSearch = async (query: string) => {
        console.log(query);
    };

    return (
        <>
            <Header linkPath="/" linkText="Início" />
            <main className="px-4 py-8">
                <SearchBar handleSearch={handleSearch} />

                <AdminTaskContainer
                    tasks={taskList.today}
                    sectionTitle="Tarefas de Hoje"
                />
                <AdminTaskContainer
                    tasks={taskList.others}
                    sectionTitle="Outras tarefas"
                />
            </main>
        </>
    );
}
