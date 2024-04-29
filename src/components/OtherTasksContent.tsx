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
        <article className="visual-card-item grid h-full grid-cols-[64px_1fr] items-center gap-2 bg-neutral-50">
            <h3 className="text-primary-600  flex h-full w-full min-w-[64px] items-center justify-center  bg-neutral-50 text-center text-xl font-bold">
                {unitValue}
            </h3>
            <ul className="flex-grow-[1]">
                {tasks.map((tks) => (
                    <li
                        key={tks._id}
                        className="bg-primary-600 border-b-[1px] border-neutral-50 px-4 py-4 text-neutral-50"
                    >
                        <strong className="block text-lg font-normal">
                            {tks.title}
                        </strong>
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
