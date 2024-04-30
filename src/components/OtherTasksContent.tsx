import { selectTasks } from "../lib/features/tasks/tasksSlice";
import { getVisualContainers } from "../lib/features/visualization/visualTasks";
import { useAppSelector } from "../lib/hooks";
import TaskLoadingIndicator from "./TaskLoadingIndicator";
import VisualCardItem from "./VisualCardItem";

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
