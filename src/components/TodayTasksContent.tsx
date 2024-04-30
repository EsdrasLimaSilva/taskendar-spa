import { selectTasks } from "../lib/features/tasks/tasksSlice";
import { useAppSelector } from "../lib/hooks";
import TaskLoadingIndicator from "./TaskLoadingIndicator";
import TodayTaskCard from "./TodayTaskCard";

export default function TodayTasksContent() {
    const { taskList, currentPage, loadingTasks } = useAppSelector(selectTasks);

    if (loadingTasks.today) return <TaskLoadingIndicator />;

    return (
        <main data-testid="today-tasks-content" className="py-12">
            <h2 className="mb-16  text-center text-3xl font-bold">
                Tarefas de hoje
            </h2>
            {taskList.today.length > 0 ? (
                <TodayTaskCard task={taskList.today[currentPage - 1]} />
            ) : (
                <h2 data-testid="empty-tasks-warning" className="text-center">
                    Nenhuma task para mostrar hoje
                </h2>
            )}
        </main>
    );
}
