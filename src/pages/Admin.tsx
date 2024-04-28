import { useAuth0 } from "@auth0/auth0-react";
import AdminCreateTaskBtn from "../components/AdminCreateTaskBtn";
import AdminEditTaskModal from "../components/AdminEditTaskModal";
import AdminTaskContent from "../components/AdminTaskContent";
import Header from "../components/Header";
import LoginComponent from "../components/LoginComponent";
import SearchBar from "../components/SearchBar";
import {
    searchTasksQueryThunk,
    selectTasks,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

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
                <main className="mx-auto w-full max-w-[800px] px-4 py-8">
                    <SearchBar handleSearch={handleSearch} />
                    <AdminCreateTaskBtn />
                    <AdminTaskContent />
                </main>
            </>
        );

    return <LoginComponent />;
}
