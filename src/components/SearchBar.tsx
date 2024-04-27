import { FormEvent, useRef } from "react";
import { FaSearch } from "react-icons/fa";

interface Props {
    handleSearch: (query: string) => Promise<void>;
}

export default function SearchBar({ handleSearch }: Props) {
    const queryInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (queryInputRef.current) {
            const query = queryInputRef.current.value;
            await handleSearch(query);
        }
    };

    return (
        <form
            className="w-full flex align-center justify-between overflow-clip border-[1px]  border-neutral-600 rounded-full max-w-[600px] mx-auto"
            onSubmit={handleSubmit}
        >
            <input
                ref={queryInputRef}
                type="text"
                placeholder="Busque por uma tarefa"
                className="px-9 py-2 outline-none text-base w-full"
            />

            <button
                type="submit"
                className="bg-neutral-500 text-neutral-50 w-[25%] max-w-[200px] flex justify-center items-center"
            >
                <FaSearch />
            </button>
        </form>
    );
}
