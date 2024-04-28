interface Props {
    measure: string;
    value: number;
}

export default function DurationCardItem({ measure, value }: Props) {
    return (
        <li className="flex flex-grow-[1] flex-col">
            <h4 className="text-lg">{measure}</h4>
            <p className="w-full rounded-md bg-neutral-400 py-4 text-center text-lg font-bold text-neutral-50">
                {value.toString().padStart(2, "0")}
            </p>
        </li>
    );
}
