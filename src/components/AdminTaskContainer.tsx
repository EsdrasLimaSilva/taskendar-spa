import { TaskType } from "../lib/features/tasks/tasksSlice";
import AdminEditTaskCard from "./AdminEditTaskCard";

interface Props {
    sectionTitle: string;
    tasks: TaskType[];
    testId?: string;
}

export default function AdminTaskContainer({
    sectionTitle,
    tasks,
    testId,
}: Props) {
    return (
        <section data-testid={testId} className="mx-auto w-full py-16">
            <h2 className="mb-8 text-2xl">{sectionTitle}</h2>
            <ul className="task-list flex w-full flex-col gap-4">
                {tasks.length > 0 ? (
                    tasks.map((tsk) => (
                        <AdminEditTaskCard key={tsk._id} task={tsk} />
                    ))
                ) : (
                    <li className="text-center">Nada para mostrar</li>
                )}
            </ul>
        </section>
    );
}
