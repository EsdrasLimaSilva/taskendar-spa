export interface ApiResponseType {
    ok: boolean;
    message: string;
    data: any;
}

export interface HolidayResponseType {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
    fixed: boolean;
    global: boolean;
    counties: Object;
    launchYear: Object;
    types: string[];
}
