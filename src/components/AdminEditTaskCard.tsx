import { MdEdit, MdRemove } from "react-icons/md";
import {
    TaskType,
    deleteTaskThunk,
    setEditModalVisible,
    setTargetEditTask,
} from "../lib/features/tasks/tasksSlice";
import { useAppDispatch } from "../lib/hooks";
import { IoMdTrash } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
        const token = await getAccessTokenSilently();
        dispatch(deleteTaskThunk({ taskId: task._id, token }));
        hideConfirmation();
    };

    return (
        <li className=" relative flex item-center justify-between text-xl bg-neutral-50 p-4 text-neutral-600 rounded-md overflow-clip">
            <span
                className={`flex flex-row justify-around items-center bg-neutral-100 border-2 border-neutral-200 absolute top-0 right-0 bottom-0 text-2xl gap-2 [&>button]:text-3xl w-[12%] min-w-[80px] translate-x-full transition-all ${
                    deleteConfirmationVisible && "translate-x-0"
                }`}
            >
                <button type="button" onClick={deleteTask}>
                    <BiCheck />
                </button>
                <button type="button" onClick={hideConfirmation}>
                    <CgClose />
                </button>
            </span>
            <h4>{task.title}</h4>

            <button
                className="flex flex-row item-center"
                type="button"
                onClick={showConfirmation}
            >
                <IoMdTrash className="text-3xl" />
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
