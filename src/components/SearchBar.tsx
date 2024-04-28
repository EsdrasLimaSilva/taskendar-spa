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
            className="align-center mx-auto flex w-full max-w-[600px] justify-between  overflow-clip rounded-full border-[1px] border-neutral-600"
            onSubmit={handleSubmit}
        >
            <input
                ref={queryInputRef}
                type="text"
                placeholder="Busque por uma tarefa"
                className="w-full px-9 py-2 text-base outline-none"
            />

            <button
                type="submit"
                className="flex w-[25%] max-w-[200px] items-center justify-center bg-neutral-500 text-neutral-50"
            >
                <FaSearch />
            </button>
        </form>
    );
}
