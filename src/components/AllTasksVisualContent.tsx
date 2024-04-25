import { TaskType } from "../lib/features/tasks/tasksSlice";
import { selectVisualization } from "../lib/features/visualization/visualizationSlice";
import { useAppSelector } from "../lib/hooks";

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
                        className="border-b-[1px] border-neutral-400 py-4"
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
    const { containers, modeLabel } = useAppSelector(selectVisualization);

    return (
        <section className="w-full flex flex-col gap-8 h-fit py-16">
            <h2 className="text-2xl text-neutral-600">{modeLabel}</h2>
            {containers.length > 0 &&
                containers.map((cont) => (
                    <VisualCardItem
                        key={cont.label}
                        tasks={cont.tasks}
                        unitValue={cont.label}
                    />
                ))}
        </section>
    );
}
