import PaginationControl from "./PaginationControl";
import TodayTasksContent from "./TodayTasksContent";

export default function TodayContainer() {
    return (
        <article className="bg-neutral-50 py-4 px-4 w-full flex-wrap md:h-full md:overflow-auto md:pb-32">
            <TodayTasksContent />
            <PaginationControl />
        </article>
    );
}
