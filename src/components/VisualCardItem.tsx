import { PiFlagBannerFill } from "react-icons/pi";
import { TaskType } from "../lib/features/tasks/tasksSlice";

interface Props {
    unitValue: string;
    tasks: TaskType[];
}

export default function VisualCardItem({ unitValue, tasks }: Props) {
    return (
        <article className="visual-card-item grid h-full grid-cols-[64px_1fr] items-center gap-2 bg-neutral-50 ">
            <h3 className="flex  h-full w-full min-w-[64px] items-center justify-center bg-neutral-400  text-center text-xl font-bold text-neutral-50">
                {unitValue}
            </h3>
            <ul className="flex-grow-[1]">
                {tasks.map((tks) => (
                    <li
                        key={tks._id}
                        className="flex items-center justify-between border-b-[1px] border-neutral-300 bg-neutral-50 px-4 py-4 text-neutral-500"
                    >
                        <strong className="block text-lg font-normal">
                            {tks.title}
                        </strong>
                        <div className="flex w-fit items-center gap-2">
                            <span
                                className={` block h-4 w-4 rounded-full border-[1px] border-neutral-300 ${tks.done ? " bg-success-500" : "bg-warning-500"}`}
                            />
                            {tks.isHoliday && (
                                <PiFlagBannerFill className="h-6 w-6 text-action-500" />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </article>
    );
}
