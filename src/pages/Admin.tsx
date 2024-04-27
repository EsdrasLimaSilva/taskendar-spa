import { useAuth0 } from "@auth0/auth0-react";
import AdminEditTaskModal from "../components/AdminEditTaskModal";
import AdminTaskContainer from "../components/AdminTaskContainer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import {
    selectTasks,
    setEditModalVisible,
    setTargetEditTask,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import LoginComponent from "../components/LoginComponent";
import LoadingComponent from "../components/LoadingComponent";

export default function Admin() {
    const { user, isLoading } = useAuth0();
    const { taskList, editModal } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    const handleSearch = async (query: string) => {
        console.log(query);
    };

    if (user)
        return (
            <>
                {editModal.visible && <AdminEditTaskModal />}

                <Header linkPath="/" linkText="Início" />
                <main className="px-4 py-8">
                    <SearchBar handleSearch={handleSearch} />
                    <button
                        className="px-8 bg-neutral-500 text-neutral-50 font-bold w-full my-4 text-xl py-2 rounded-full max-w-[200px] block mx-auto"
                        onClick={() => {
                            dispatch(setTargetEditTask(""));
                            dispatch(setEditModalVisible());
                        }}
                    >
                        criar tarefa
                    </button>

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

    return <LoginComponent />;
}
