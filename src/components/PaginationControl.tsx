import { goToPage, selectTasks } from "../lib/features/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";

export default function PaginationControl() {
    const { taskList, currentPage } = useAppSelector(selectTasks);
    const dispatch = useAppDispatch();

    if (taskList.today.length == 1) return;

    return (
        <ul className="flex-wra flex flex-row items-center justify-center gap-4 px-2  text-xl">
            {taskList.today.map((tks, i) => (
                <li
                    key={tks._id}
                    className={`flex h-[48px] w-[48px] cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-600 bg-neutral-50 ${
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
