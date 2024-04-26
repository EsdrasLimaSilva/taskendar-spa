import { MdEdit } from "react-icons/md";
import {
    TaskType,
    setEditModalVisible,
    setTargetEditTask,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch } from "../lib/hooks";

export default function AdminEditTaskCard({ task }: { task: TaskType }) {
    const dispatch = useAppDispatch();

    return (
        <li className="flex item-center justify-between text-xl bg-neutral-50 p-4 text-neutral-600 rounded-md">
            <h4>{task.title}</h4>
            <button type="button">
                <MdEdit
                    className="text-3xl"
                    onClick={() => {
                        dispatch(setTargetEditTask(task._id));
                        dispatch(setEditModalVisible());
                    }}
                />
            </button>
        </li>
    );
}
