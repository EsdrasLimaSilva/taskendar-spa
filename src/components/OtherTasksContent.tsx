import { TaskType, selectTasks } from "../lib/features/tasks/tasksSlice";
import { getVisualContainers } from "../lib/features/visualization/visualTasks";
import { useAppSelector } from "../lib/hooks";
import TaskLoadingIndicator from "./TaskLoadingIndicator";

interface VisualItemProps {
    unitValue: string;
    tasks: TaskType[];
}

const VisualCardItem = ({ unitValue, tasks }: VisualItemProps) => {
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
                        <span
                            className={` block h-4 w-4 rounded-full border-[1px] border-neutral-300 ${tks.done ? " bg-success-500" : "bg-warning-500"}`}
                        />
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default function OtherTasksContent() {
    const { visual, taskList, loadingTasks } = useAppSelector(selectTasks);

    const visualResponse = getVisualContainers(
        visual.year,
        visual.month,
        taskList.others,
        visual.mode,
    );

    if (loadingTasks.others) return <TaskLoadingIndicator />;

    return (
        <section
            data-testid="other-tasks-content"
            className="flex w-full flex-col gap-8 py-16"
        >
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
