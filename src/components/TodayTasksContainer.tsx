import PaginationControl from "./PaginationControl";
import TodayTasksContent from "./TodayTasksContent";

export default function TodayContainer() {
    return (
        <article className="bg-neutral-50 py-4 px-4 w-full flex-wrap lg:h-full lg:overflow-auto lg:pb-32">
            <TodayTasksContent />
            <PaginationControl />
        </article>
    );
}
