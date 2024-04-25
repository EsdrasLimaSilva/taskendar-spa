import { constructNow, intervalToDuration } from "date-fns";
import { TaskType } from "../lib/features/tasks/tasksSlice";
import DurationCardItem from "./DurationCardItem";
import { useState } from "react";

interface Props {
    task: TaskType;
}

export default function TaskCard({ task }: Props) {
    const startDate = new Date(task.startsAt);
    const endsAt = new Date(task.endsAt);

    const diffInterval = intervalToDuration({
        start: startDate,
        end: endsAt,
    });

    return (
        <article className="flex flex-col gap-6">
            <header className="flex flex-row justify-between items-end w-full">
                <h2 className="text-2xl w-ful">{task.title}</h2>
                <h3 className="bg-neutral-400 text-neutral-50 text-lg font-bold px-4 py-2 rounded-md">
                    {startDate.getHours()}:
                    {startDate.getMinutes().toString().padStart(2, "0")}h
                </h3>
            </header>
            <main>
                <p className="text-lg text-justify">{task.description}</p>
            </main>
            <footer>
                <h3 className="text-xl mb-6 font-bold">Duração</h3>
                <ul className="flex flex-col gap-6">
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
