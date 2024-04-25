import PaginationControl from "./PaginationControl";
import SearchBar from "./SearchBar";
import TodayTasksContent from "./TodayTasksContent";

export default function TodayContainer() {
    const searchTask = async (query: string) => {};

    return (
        <article className="bg-neutral-50 py-2 px-4 w-full flex-wrap">
            <SearchBar handleSearch={searchTask} />
            <TodayTasksContent />
            <PaginationControl />
        </article>
    );
}
