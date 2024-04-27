import { TaskType } from "../lib/features/tasks/tasksSlice";
import AdminEditTaskCard from "./AdminEditTaskCard";

interface Props {
    sectionTitle: string;
    tasks: TaskType[];
}

export default function AdminTaskContainer({ sectionTitle, tasks }: Props) {
    return (
        <section className="py-16 w-full mx-auto">
            <h2 className="text-2xl mb-8">{sectionTitle}</h2>
            <ul className="w-full flex flex-col gap-4">
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
