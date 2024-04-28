import PaginationControl from "./PaginationControl";
import TodayTasksContent from "./TodayTasksContent";

export default function TodayContainer() {
    return (
        <article className="w-full flex-wrap bg-neutral-50 px-4 py-4 md:h-full md:overflow-auto md:pb-32">
            <TodayTasksContent />
            <PaginationControl />
        </article>
    );
}
