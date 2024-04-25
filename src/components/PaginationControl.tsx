export default function PaginationControl() {
    return (
        <ul className="flex flex-row items-center text-xl p-2 gap-8 flex-wrap">
            <li className="flex justify-center items-center bg-neutral-50 w-[48px] h-[48px] rounded-full border-[1px] border-neutral-600">
                1
            </li>
            <li className="flex justify-center items-center bg-neutral-50 w-[48px] h-[48px] rounded-full border-[1px] border-neutral-600">
                2
            </li>
            <li className="flex justify-center items-center bg-neutral-50 w-[48px] h-[48px] rounded-full border-[1px] border-neutral-600">
                2
            </li>
        </ul>
    );
}
