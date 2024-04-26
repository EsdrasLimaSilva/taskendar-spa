import { MdEdit } from "react-icons/md";
import { TaskType } from "../lib/features/tasks/tasksSlice";

export default function AdminEditTaskCard({ task }: { task: TaskType }) {
    return (
        <li className="flex item-center justify-between text-xl bg-neutral-50 p-4 text-neutral-600 rounded-md">
            <h4>{task.title}</h4>
            <MdEdit className="text-3xl" />
        </li>
    );
}
