import {
    dateEquals,
    dateIsInInterval,
    getLastDay,
    getMonthName,
    getWeekBoundaries,
    getWeeks,
} from "../../../utils/dateUtils";
import { EVisualMode, TaskType } from "../tasks/tasksSlice";

export interface VisualContainerType {
    label: string;
    stDate: string; // iso format
    ndDate: string; // iso format
    tasks: TaskType[];
}

export interface VisualResponseType {
    modeLabel: string;
    containers: VisualContainerType[];
}

function getMonthContainers(
    year: number,
    month: number,
    tasks: TaskType[],
): VisualResponseType {
    const containers: VisualContainerType[] = [
        {
            label: getMonthName(month),
            stDate: new Date(year, month).toISOString(),
            ndDate: new Date(year, month).toISOString(),
            tasks: tasks.filter((tks) =>
                dateIsInInterval(
                    new Date(tks.startsAt),
                    new Date(year, month, 1),
                    new Date(year, month + 1, 0),
                ),
            ),
        },
    ];
    return {
        modeLabel: "Todas as tarefas do mês",
        containers: [...containers],
    };
}

function getWeekContainers(
    year: number,
    month: number,
    tasks: TaskType[],
): VisualResponseType {
    const weeks = getWeeks(year, month);

    const containers: VisualContainerType[] = [];

    weeks.forEach((week) => {
        const weekBoundaries = getWeekBoundaries(week);
        const weekStartDate = new Date(year, month, weekBoundaries.min);
        const weekEndDate = new Date(year, month, weekBoundaries.max);

        const label = `${weekStartDate
            .getDate()
            .toString()
            .padStart(2, "0")}-${weekEndDate
            .getDate()
            .toString()
            .padStart(2, "0")}`;

        containers.push({
            label,
            stDate: weekStartDate.toISOString(),
            ndDate: weekEndDate.toISOString(),
            tasks: tasks.filter((tks) =>
                dateIsInInterval(
                    new Date(tks.startsAt),
                    weekStartDate,
                    weekEndDate,
                ),
            ),
        });
    });

    return { modeLabel: "Semanas do mês", containers: [...containers] };
}

function getDayContainers(
    year: number,
    month: number,
    tasks: TaskType[],
): VisualResponseType {
    const containers: VisualContainerType[] = [];
    const targetDate = new Date(year, month, 1);

    for (let i = 1; i <= getLastDay(year, month); i++) {
        targetDate.setDate(i);

        containers.push({
            label: i.toString().padStart(2, "0"),
            stDate: targetDate.toISOString(),
            ndDate: targetDate.toISOString(),
            tasks: tasks.filter((tks) =>
                dateEquals(new Date(tks.startsAt), targetDate),
            ),
        });
    }

    return { modeLabel: "Dias do Mês", containers: [...containers] };
}

export function getVisualContainers(
    year: number,
    month: number,
    tasks: TaskType[],
    mode: EVisualMode,
) {
    if (mode == EVisualMode.DAY) return getDayContainers(year, month, tasks);

    if (mode == EVisualMode.WEEK) return getWeekContainers(year, month, tasks);

    return getMonthContainers(year, month, tasks);
}
