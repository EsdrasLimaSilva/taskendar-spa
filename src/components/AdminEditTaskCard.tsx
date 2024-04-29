import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import {
    TaskType,
    deleteTaskThunk,
    setEditModalVisible,
    setTargetEditTask,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch } from "../lib/hooks";

export default function AdminEditTaskCard({ task }: { task: TaskType }) {
    const { getAccessTokenSilently } = useAuth0();
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
        useState(false);

    const dispatch = useAppDispatch();

    const showConfirmation = () => {
        setDeleteConfirmationVisible(true);
    };

    const hideConfirmation = () => {
        setDeleteConfirmationVisible(false);
    };

    const deleteTask = async () => {
        hideConfirmation();
        const token = await getAccessTokenSilently();
        dispatch(deleteTaskThunk({ taskId: task._id, token }));
    };

    return (
        <li
            data-testid="admin-task-card"
            className="task-card-item item-center relative flex justify-between overflow-clip rounded-md bg-neutral-50 p-4 text-xl text-neutral-600"
        >
            <span
                data-testid="confirm-task-del-area"
                className={`adm-confirm-area absolute bottom-0 right-0 top-0 flex w-[12%] min-w-[80px] translate-x-full flex-row items-center justify-around gap-2 border-2 border-neutral-200 bg-neutral-100 text-2xl transition-all [&>button]:text-3xl ${
                    deleteConfirmationVisible && "translate-x-0"
                }`}
            >
                <button
                    data-testid="confirm-task-del-btn"
                    type="button"
                    onClick={deleteTask}
                >
                    <BiCheck />
                </button>
                <button
                    data-testid="cancel-task-del-btn"
                    type="button"
                    onClick={hideConfirmation}
                >
                    <CgClose />
                </button>
            </span>
            <h4 data-testid="admin-edit-task-card-title">{task.title}</h4>

            <div className="item-center flex flex-row">
                <button
                    data-testid="show-confirmation-area-btn"
                    type="button"
                    onClick={showConfirmation}
                >
                    <IoMdTrash className="text-3xl" />
                </button>
                <button
                    data-testid="edit-task-card-btn"
                    onClick={() => {
                        dispatch(setTargetEditTask(task._id));
                        dispatch(setEditModalVisible());
                    }}
                >
                    <MdEdit className="text-3xl" />
                </button>
            </div>
        </li>
    );
}
