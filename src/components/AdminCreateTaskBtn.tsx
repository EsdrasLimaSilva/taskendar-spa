import {
    setEditModalVisible,
    setTargetEditTask,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch } from "../lib/hooks";

export default function AdminCreateTaskBtn() {
    const dispatch = useAppDispatch();

    return (
        <button
            data-testid="admin-create-task-btn"
            className="mx-auto my-4 block w-full max-w-[200px] rounded-full bg-neutral-500 px-8 py-2 text-xl font-bold text-neutral-50"
            onClick={() => {
                dispatch(setTargetEditTask(""));
                dispatch(setEditModalVisible());
            }}
        >
            criar tarefa
        </button>
    );
}
