interface Props {
    measure: string;
    value: number;
}

export default function DurationCardItem({ measure, value }: Props) {
    return (
        <li className="flex flex-col flex-grow-[1]">
            <h4 className="text-lg">{measure}</h4>
            <p className="w-full font-bold text-lg bg-neutral-400 text-neutral-50 py-4 text-center rounded-md">
                {value.toString().padStart(2, "0")}
            </p>
        </li>
    );
}
