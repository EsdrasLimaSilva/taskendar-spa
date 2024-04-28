import { TaskType, selectTasks } from "../lib/features/tasks/tasksSlice";
import { useAppSelector } from "../lib/hooks";
import { getVisualContainers } from "../lib/features/visualization/visualTasks";
import TaskLoadingIndicator from "./TaskLoadingIndicator";

interface VisualItemProps {
    unitValue: string;
    tasks: TaskType[];
}

const VisualCardItem = ({ unitValue, tasks }: VisualItemProps) => {
    return (
        <article className="grid grid-cols-[64px_1fr] items-center gap-2 bg-neutral-50 h-full">
            <h3 className="w-full h-full flex justify-center items-center min-w-[64px] bg-neutral-400 text-neutral-50 text-center text-xl font-bold">
                {unitValue}
            </h3>
            <ul className="flex-grow-[1]">
                {tasks.map((tks) => (
                    <li
                        key={tks._id}
                        className="border-b-[1px] border-neutral-50 py-4 bg-neutral-400 text-neutral-50 px-4"
                    >
                        <strong className="text-lg block font-normal">
                            {tks.title}
                        </strong>
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default function AllTasksVisualContent() {
    const { visual, taskList, loadingTasks } = useAppSelector(selectTasks);

    const visualResponse = getVisualContainers(
        visual.year,
        visual.month,
        taskList.others,
        visual.mode,
    );

    if (loadingTasks.others) return <TaskLoadingIndicator />;

    return (
        <section className="w-full flex flex-col gap-8 py-16">
            <h2 className="text-2xl text-neutral-600">
                {visualResponse.modeLabel}
            </h2>
            {visualResponse.containers.length > 0 &&
                visualResponse.containers.map((cont) => (
                    <VisualCardItem
                        key={cont.label}
                        tasks={cont.tasks}
                        unitValue={cont.label}
                    />
                ))}
        </section>
    );
}
