import { goToPage, selectTasks } from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function PaginationControl() {
    const { taskList, currentPage } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    if (taskList.today.length == 1) return;

    return (
        <ul className="flex flex-row justify-between items-center text-xl p-2 gap-8 flex-wrap">
            {taskList.today.map((tks, i) => (
                <li
                    key={tks.id}
                    className={`flex justify-center items-center bg-neutral-50 w-[48px] h-[48px] rounded-full border-[1px] border-neutral-600 ${
                        i + 1 == currentPage && "bg-neutral-600 text-neutral-50"
                    }`}
                    onClick={() => dispatch(goToPage(i + 1))}
                >
                    {i + 1}
                </li>
            ))}
        </ul>
    );
}
