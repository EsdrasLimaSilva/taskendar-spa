import { useAuth0 } from "@auth0/auth0-react";
import AdminEditTaskModal from "../components/AdminEditTaskModal";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import {
    searchTasksQueryThunk,
    selectTasks,
    setEditModalVisible,
    setTargetEditTask,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import LoginComponent from "../components/LoginComponent";
import AdminTaskContent from "../components/AdminTaskContent";

export default function Admin() {
    const { editModal, search } = useAppSelector(selectTasks);

    const { user, getAccessTokenSilently } = useAuth0();
    const dispatch = useAppDispatch();

    const handleSearch = async (query: string) => {
        const token = await getAccessTokenSilently();
        dispatch(searchTasksQueryThunk({ query, token }));
    };

    if (user)
        return (
            <>
                {editModal.visible && <AdminEditTaskModal />}

                <Header linkPath="/" linkText="Início" />
                <main className="px-4 py-8 w-full max-w-[800px] mx-auto">
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
                    <AdminTaskContent />
                </main>
            </>
        );

    return <LoginComponent />;
}
