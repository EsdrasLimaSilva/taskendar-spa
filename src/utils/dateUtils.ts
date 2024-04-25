export enum Month {
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

export function getLastDay(year: number, month: number) {
    const lastDay = new Date(year, month + 1, 0).getDate();
    return lastDay;
}

export function dateEquals(date1: Date, date2: Date) {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() == date2.getDate()
    );
}
