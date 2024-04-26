export enum EMonth {
    JAN = 0,
    FEB,
    MAR,
    APR,
    MAY,
    JUN,
    JUL,
    AUG,
    SEP,
    OCT,
    NOV,
    DEC,
}

export enum EDay {
    SUN = 0,
    MON,
    TUE,
    WED,
    THU,
    FRI,
    SAT,
}

export function getLastDay(year: number, month: number) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return lastDay;
}

/**
 * Compares Two dates
 * @returns 1 if date1 > date2
 * @returns -1 if date1 < date2
 * @returns 0 if date1 == date2
 */
export function dateCompare(date1: Date, date2: Date) {
    console.log(date1);
    console.log(date2);
    return date1.getMilliseconds() - date2.getMilliseconds();
}

export function toStringYYYMMDD(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function toStringTimeHHMM(date: Date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
}

export function dateEquals(date1: Date, date2: Date) {
    return date1 == date2;
}

export function getWeeks(
    year: number,
    month: number,
): Array<Array<number | null>> {
    const numDays = getLastDay(year, month);
    const numOfWeeks = Math.ceil(numDays / 7);

    const weeks = [];

    let day = 1;
    for (let i = 0; i < numOfWeeks; i++) {
        const week: Array<number | null> = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
        ]; // monday to saturday

        for (let i = 0; i < 7 && day <= numDays; i++) {
            const pos = new Date(year, month, day).getDay();
            week[pos] = day++;
            if (pos == week.length - 1) break; // we reached the end of the week
        }

        weeks[i] = week;
    }

    return weeks;
}

export function getWeekBoundaries(week: Array<number | null>) {
    const boundaries = { min: 99, max: 0 };

    week.forEach((day) => {
        if (day && day < boundaries.min) boundaries.min = day;
        if (day && day > boundaries.max) boundaries.max = day;
    });

    return boundaries;
}

export function dateIsInInterval(
    target: Date,
    pastDate: Date,
    futureDate: Date,
) {
    return target >= pastDate && target <= futureDate;
}

export function getMonthName(monthIndex: number) {
    switch (monthIndex) {
        case 0:
            return "Jan";
        case 1:
            return "Fev";
        case 2:
            return "Mar";
        case 3:
            return "Abr";
        case 4:
            return "Maio";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Ago";
        case 8:
            return "Set";
        case 9:
            return "Out";
        case 10:
            return "Nov";
        case 11:
            return "Dez";
    }

    return "Indefinido";
}
