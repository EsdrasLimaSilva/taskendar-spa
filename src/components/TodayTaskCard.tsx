import { intervalToDuration } from "date-fns";
import { TaskType } from "../lib/features/tasks/tasksSlice";
import DurationCardItem from "./DurationCardItem";

interface Props {
    task: TaskType;
}

export default function TodayTaskCard({ task }: Props) {
    const startsAt = new Date(task.startsAt);
    const endsAt = new Date(task.endsAt);

    const diffInterval = intervalToDuration({
        start: startsAt,
        end: endsAt,
    });

    return (
        <article className="task-card flex flex-col gap-6">
            <header className="flex w-full flex-row items-end justify-between gap-2">
                <div>
                    <h2 className="w-ful text-3xl">{task.title}</h2>
                </div>
                <h3 className="w-24 rounded-md bg-neutral-400 px-4 py-2 text-center text-lg font-bold text-neutral-50">
                    {startsAt.getHours().toString().padStart(2, "0")}:
                    {startsAt.getMinutes().toString().padStart(2, "0")}h
                </h3>
            </header>
            <span
                className={` block h-2 w-full rounded-full ${task.done ? " bg-success-500" : "bg-warning-500"}`}
            />
            <main>
                <p className="text-justify text-lg">{task.description}</p>
            </main>
            <footer className="border-t-2 border-t-neutral-300 pt-8">
                <h3 className="mb-6 text-center text-xl">Duração</h3>
                <ul className="flex w-full flex-col gap-6 md:flex-row md:flex-wrap">
                    {diffInterval.years && (
                        <DurationCardItem
                            measure="Anos"
                            value={diffInterval.years || 0}
                        />
                    )}
                    {diffInterval.months && (
                        <DurationCardItem
                            measure="Meses"
                            value={diffInterval.months || 0}
                        />
                    )}
                    {diffInterval.days && (
                        <DurationCardItem
                            measure="Dias"
                            value={diffInterval.days || 0}
                        />
                    )}
                    <DurationCardItem
                        measure="Horas"
                        value={diffInterval.hours || 0}
                    />
                    <DurationCardItem
                        measure="Minutos"
                        value={diffInterval.minutes || 0}
                    />
                    <DurationCardItem
                        measure="Segundos"
                        value={diffInterval.minutes || 0}
                    />
                </ul>
            </footer>
        </article>
    );
}
