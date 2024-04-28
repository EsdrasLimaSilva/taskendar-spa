import { selectTasks } from "../lib/features/tasks/tasksSlice";
import { useAppSelector } from "../lib/hooks";
import TaskCard from "./TaskCard";
import TaskLoadingIndicator from "./TaskLoadingIndicator";

export default function TodayTasksContainer() {
    const { taskList, currentPage, loadingTasks } = useAppSelector(selectTasks);

    if (loadingTasks.today) return <TaskLoadingIndicator />;

    return (
        <main className="py-12">
            <h2 className="text-3xl font-bold mb-16 text-center ">
                Tarefas de hoje
            </h2>
            {taskList.today.length > 0 ? (
                <TaskCard task={taskList.today[currentPage - 1]} />
            ) : (
                <h2 className="text-center">Nenhuma task para mostrar hoje</h2>
            )}
        </main>
    );
}
