import { selectTasks, setSearchActive } from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import AdminTaskContainer from "./AdminTaskContainer";
import OtherTasksIntervalController from "./OtherTasksIntervalController";
import TaskLoadingIndicator from "./TaskLoadingIndicator";

export default function AdminTaskContent() {
    const { taskList, search, loadingTasks } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    if (search.loading) return <TaskLoadingIndicator />;

    if (search.active) {
        return (
            <section>
                <button
                    type="button"
                    className="px-4 bg-neutral-400 text-neutral-50 text-xl rounded-full"
                    onClick={() => dispatch(setSearchActive(false))}
                >
                    Voltar
                </button>
                <AdminTaskContainer
                    tasks={search.tasks}
                    sectionTitle="Tarefas encontradas"
                />
            </section>
        );
    }

    return (
        <>
            {loadingTasks.today ? (
                <TaskLoadingIndicator />
            ) : (
                <AdminTaskContainer
                    tasks={taskList.today}
                    sectionTitle="Tarefas de Hoje"
                />
            )}

            {loadingTasks.others ? (
                <TaskLoadingIndicator />
            ) : (
                <>
                    <OtherTasksIntervalController />
                    <AdminTaskContainer
                        tasks={taskList.others}
                        sectionTitle="Outras tarefas"
                    />
                </>
            )}
        </>
    );
}
