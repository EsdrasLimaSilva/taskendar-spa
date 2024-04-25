import PaginationControl from "./PaginationControl";
import SearchBar from "./SearchBar";
import TaskDayContent from "./TaskDayContent";

export default function TaskDayContainer() {
    const searchTask = async (query: string) => {
        console.log(new Date());
    };

    return (
        <article className="bg-neutral-50 py-2 px-4 w-full flex-wrap">
            <SearchBar handleSearch={searchTask} />
            <TaskDayContent />
            <PaginationControl />
        </article>
    );
}
