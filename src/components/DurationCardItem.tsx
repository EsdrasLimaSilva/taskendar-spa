interface Props {
    measure: string;
    value: number;
}

export default function DurationCardItem({ measure, value }: Props) {
    return (
        <li className="flex flex-grow-[1] flex-col">
            <h4 className="text-lg">{measure}</h4>
            <p className="bg-primary-100 border-primary-200 w-full rounded-md border-[1px] py-4 text-center text-lg font-bold text-neutral-600">
                {value.toString().padStart(2, "0")}
            </p>
        </li>
    );
}
